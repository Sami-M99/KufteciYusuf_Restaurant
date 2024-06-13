// import { promisify } from "util";
// import jwt from "jsonwebtoken";
// import crypto from "crypto";
// import User from "../models/userModel.js"; // Use the default import for User model
// import { AppError } from "../utils/AppError.js";
// import { catchAsyn } from "../utils/catchAsyn.js";
// import { sendEmail, sendVerificationCode } from "../utils/email.js";

// const signToken = (id) => {
//     return jwt.sign({ id: id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE
//     });
// };

// function generateNumericVerificationCode(length) {
//     const min = Math.pow(10, length - 1);
//     const max = Math.pow(10, length) - 1;
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// export const SignUp = catchAsyn(async (req, res, next) => {
//     const verificationCode = generateNumericVerificationCode(6);
//     const newUser = await User.create({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         address: req.body.address,
//         email: req.body.email,
//         password: req.body.password,
//         passwordConfirm: req.body.passwordConfirm,
//         verificationCode: verificationCode,
//     });

//     const verifyUrl = `${req.protocol}://${req.get('host')}/api/v1/users/verify/${verificationCode}`;

//     await sendVerificationCode({
//         email: newUser.email,
//         verificationCode: verificationCode,
//         subject: "Verification Code",
//         message: `Please verify your email: ${verifyUrl}`
//     });

//     res.status(200).json({
//         status: "success",
//         message: "Verification code sent to email"
//     });

//     next();
// });

// export const LogIn = catchAsyn(async (req, res, next) => {
//     const { email, password } = req.body;

//     if (!email || !password) return next(new AppError("Please provide email and password", 400));

//     const user = await User.findOne({ email }).select("+password");
//     if (!user || !(await user.correctPassword(password, user.password))) {
//         return next(new AppError("Incorrect email or password", 401));
//     }
//     if (!user.isActive) {
//         return next(new AppError('Your account is not yet verified. Please check your email for the verification code.', 401));
//     }

//     const token = signToken(user._id);
//     res.status(200).json({
//         status: "success",
//         token,
//         user
//     });
// });

// export const getCurrentUser = (req, res, next) => {
//     const user = req.user;
//     try {
//         if (!user) {
//             return res.status(401).json({
//                 status: 'error',
//                 message: 'User not authenticated'
//             });
//         }

//         res.status(200).json({
//             status: 'success',
//             data: user
//         });
//     } catch (error) {
//         console.error('Error retrieving current user:', error);
//         res.status(500).json({
//             status: 'error',
//             message: 'An unexpected error occurred'
//         });
//     }
// };

// export const protect = catchAsyn(async (req, res, next) => {
//     let token;
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1];
//     }

//     if (!token) {
//         return next(new AppError('You are not logged in! Please log in to get access.', 401));
//     }

//     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//     const currentUser = await User.findById(decoded.id);
//     if (!currentUser) {
//         return next(new AppError('The user belonging to this token does no longer exist.', 401));
//     }

//     if (currentUser.changedPasswordAfter(decoded.iat)) {
//         return next(new AppError('User recently changed password! Please log in again.', 401));
//     }

//     req.user = currentUser;
//     res.locals.user = currentUser;

//     next();
// });

// export const restrictTo = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return next(new AppError("You don't have permission to perform this action", 403));
//         }
//         next();
//     };
// };

// export const forgotPassword = catchAsyn(async (req, res, next) => {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//         return next(new AppError("There is no user with that email", 404));
//     }

//     const resetToken = user.createPasswordResetToken();
//     await user.save({ validateBeforeSave: false });

//     const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
//     const message = `Forgot your password? Submit a patch request with your new password and passwordConfirm to: ${resetUrl}.\nIf you didn't request this, please ignore this email.`;

//     try {
//         await sendEmail({
//             email: user.email,
//             subject: "Your password reset token (valid for 10 min)",
//             message
//         });
//         res.status(200).json({
//             status: "success",
//             message: "Token sent to email"
//         });
//     } catch (error) {
//         console.error("Error sending password reset email:", error);
//         user.passwordResetToken = undefined;
//         user.passwordResetExpires = undefined;
//         await user.save({ validateBeforeSave: false });

//         return next(new AppError("There was an error sending the email. Try again later!"));
//     }
// });

// export const resetPassword = catchAsyn(async (req, res, next) => {
//     const hashedToken = crypto.createHash('sha256').update(req.params.token || '').digest('hex');
//     const user = await User.findOne({
//         passwordResetToken: hashedToken,
//         passwordResetExpires: { $gt: Date.now() }
//     });

//     if (!user) {
//         return next(new AppError("Token is invalid or has expired", 400));
//     }

//     user.password = req.body.password;
//     user.passwordConfirm = req.body.passwordConfirm;
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save();

//     const token = signToken(user.id);
//     res.status(200).json({
//         status: "success",
//         token
//     });
// });

// export const verifyEmail = catchAsyn(async (req, res, next) => {
//     const { email } = req.params;
//     const verificationCode = req.body.verificationCode;

//     const user = await User.findOne({ email });
//     if (!user) {
//         return next(new AppError("User not found", 404));
//     }
//     if (!verificationCode) {
//         return next(new AppError("Verification code not found", 404));
//     }
//     if (user.verificationCode !== parseInt(verificationCode)) {
//         return next(new AppError("Invalid verification code", 400));
//     }

//     user.isActive = true;
//     await user.save({ validateBeforeSave: false });

//     const token = signToken(user._id);
//     res.status(200).json({
//         status: 'success',
//         message: 'Email verified successfully. You can now log in to your account.',
//         token: token
//     });
// });
