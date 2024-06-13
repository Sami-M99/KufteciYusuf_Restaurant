import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    isActive: { type: Boolean, default: false },

    cartData: {type: Object, default: {}},
}, {minimize: false});


// it means if model is alleady created || or create a new model
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;