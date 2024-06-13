import express from "express";
import { addFood, allFood, deleteFood } from '../controllers/foodController.js';
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, colback) => {
        return colback(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage});

// post method with middleware to upload image, and "image" is the name of file when amke post for data 
foodRouter.post("/add-food",upload.single("image"), addFood);
foodRouter.get("/all-food", allFood);
foodRouter.post("/delete-food", deleteFood);

export default foodRouter;



