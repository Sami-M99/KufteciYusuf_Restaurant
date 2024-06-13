import foodModel from '../models/foodModel.js';
import fs from "fs";  // The Node.js [file system] module allows you to work with the file system on your computer.

// Add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });

    try {
        await food.save();
        res.json({ success: true, message: "Yemek Yüklendi" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Yemek Yüklenmedi, bir hata oluştu !!!" });
    }
}

// All food list
const allFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "There is error when fetch foods !!!" });
    }
}

// Remove food item
const deleteFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {});  // this to delete image from our uploads folder

        await foodModel.findByIdAndDelete(req.body.id);  // this to delete food data from database

        res.json({success: true, message: "Yemek Silindi"})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Yemek Silimedi, bir hata oluştu!!!" });
    }
}

export { addFood, allFood, deleteFood };
