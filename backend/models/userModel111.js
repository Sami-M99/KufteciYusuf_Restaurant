// import { Schema, model } from "mongoose";
// import validator from 'validator';
// import bcrypt from "bcryptjs";

// import crypto from "crypto";

// const userSchema = new Schema({
//     firstName: {
//         type: String,
//         required: [true, 'Please tell us your firstName'],
//         trim: true
//     },
//     lastName: {
//         type: String,
//         required: [true, 'Please tell us your lastName'],
//         trim: true
//     },

//     address: {
//         type: String,
//         required: [true, "Please provide your current address!"]
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: [true, "Please provide a valid email address"],
//         lowercase: true,
//         validate: [validator.isEmail, "Please provide a valid email address"]
//     },
//     role: {
//         type: String,
//         enum: ["USER", "ADMIN"],
//         default: "USER"
//     },
//     isActive: { type: Boolean, default: false },

//     password: {
//         type: String,
//         required: [true, "Please provide your password"],
//         minlength: [8, "Password must be at least 8 characters long"],
//         select: false
//     },
//     passwordChangedAt: Date
//     ,
//     passwordResetToken: {
//         type: String

//     }
//     ,
//     verificationCode: {
//         type: Number,
//         minlength: [6, "verificationCode must be at least 6 characters long"],
//     },

//     passwordResetExpires: {
//         type: Date
//     }
//     ,
//     passwordConfirm: {
//         type: String,
//         required: [true, "Please confirm your password"],
//         validate: {
//             // kaliya wxaa la istcmaalla marka la sameeye create and save
//             // it doesnt work   processws like update or  get
//             validator: function (val) {
//                 return val === this.password;
//             },
//             message: 'Passwords do not match'
//         }
//     },

// },
//     {
//         timestamps: true,
//         toJSON: {
//             transform: function (doc, ret) {
//                 delete ret.__v;
//                 delete ret.password;
//                 delete ret.passwordConfirm;
//             }
//         },

//     });

// // encryption

// userSchema.pre("save", async function (next) {

//     // only runs if password was modified

//     if (!this.isModified("password")) return next();
//     // hash password with cost of 12
//     this.password = await bcrypt.hash(this.password, 12);
//     // delete passwordConfirm field from database
//     this.passwordConfirm = undefined;
//     // next middleware
//     next();
// })


// userSchema.pre('save', function (next) {
//     if (!this.isModified('password') || this.isNew) return next();

//     this.passwordChangedAt = Date.now() - 1000;
//     next();

// })
// // instant method for checking password
// userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
//     return await bcrypt.compare(candidatePassword, userPassword)
// }


// userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
//     if (this.passwordChangedAt) {
//         const changedTimestamp = parseInt(
//             this.passwordChangedAt.getTime() / 1000,
//             10
//         );
//         console.log(changedTimestamp, JWTTimestamp);

//         return JWTTimestamp < changedTimestamp;
//     }

//     // False means NOT changed
//     return false;
// };
// // resetPassword
// userSchema.methods.createPasswordResetToken = function () {
//     const resetToken = crypto.randomBytes(32).toString('hex');

//     this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

//     console.log({ resetToken }, this.passwordResetToken)
//     this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
//     return resetToken;
// }

// const User = model("User", userSchema);

// module.exports = User;


