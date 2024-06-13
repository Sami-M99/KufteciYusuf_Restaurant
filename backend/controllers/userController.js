import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";  // to create a authentication
import bcrypt from "bcrypt";
import validator from "validator";

// Generate a Token by user id
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET )
}

// Login User
// Update the login function in userController.js
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);

        if (!user || !isMatch) {
            return res.json({ success: false, message: "Kullanıcı yada Şifre doğru değildir." });
        }

        // Set user as active
        user.isActive = true;
        await user.save();

        const token = createToken(user._id);
        res.json({ success: true, token, role: user.role });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Giriş işleminde hata vardır..." });
    }
};


// register User
const register = async (req,res) => {
    const {name, email, password} = req.body;
    try {
        // checking if user already exists
        const exist = await userModel.findOne({email});
        if(exist) {
            return res.json({success: false, message:"Kullanıcı zaten mevcuttur."})
        }

        // validating eamil format & strong password
        if(!validator.isEmail(email)){
            return res.json({success: false, message:"Email doğru değildir."})
        }
        if(password.length < 8) {
            return res.json({success: false, message:"Şifre güçlü değildir"})
        }

        // Hashing user password by bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new User in Database
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });
        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({success: true, token});

    } catch (error) {
        console.log(error);
        return res.json({success: false, message:"Kayıt işleminde hata vardır..."});
    }
}

// Add a new logout function in userController.js
const logout = async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.json({ success: false, message: "Kullanıcı bulunamadı." });
        }

        // Set user as inactive
        user.isActive = false;
        await user.save();

        res.json({ success: true, message: "Başarıyla çıkış yapıldı." });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Çıkış işleminde hata vardır..." });
    }
};

// Add a new controller function in userController.js
const getActiveUsers = async (req, res) => {
    try {
        const activeUsers = await userModel.countDocuments({ isActive: true });
        res.json({ success: true, activeUsers });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Aktif kullanıcılar sayılırken hata oluştu." });
    }
};

export { login, logout, register, getActiveUsers };



