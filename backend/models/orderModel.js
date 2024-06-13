import mongoose, { model } from "mongoose";

const orderSchems = new mongoose.Schema({
    userId: {type: String, require: true},
    items: {type: Array, require: true},
    amount: {type: Number, require: true},
    address: {type: Object, require: true},
    status: {type: String, default: "Food loading.."},
    date: {type: Date, default: Date.now()},
    payment: {type: Boolean, default: false}
});

// it means if model is alleady created || or create a new model
const orderModel = mongoose.models.order || mongoose.model("order", orderSchems);

export default orderModel;