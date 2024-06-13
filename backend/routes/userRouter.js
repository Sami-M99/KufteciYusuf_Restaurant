import express from "express";
import {  getActiveUsers, login, logout, register } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.get('/active-users', getActiveUsers);




export default userRouter;

// import { SignUp, LogIn, verifyEmail, forgotPassword, resetPassword, getCurrentUser, protect } from "../controllers/authController.js";

// import express from "express";
// const router = express.Router();

// router.route('/signup').post(SignUp);
// router.route('/login').post(LogIn);

// router.route('/verifyEmail/:email').patch(verifyEmail);
// router.route('/forgotPassword').post(forgotPassword);
// router.route('/resetPassword/:token').patch(resetPassword);
// router.route('/currentUser').get(protect, getCurrentUser);

// module.exports = router