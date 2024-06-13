import express from "express";
import { addAnnouncement, allAnnouncement, deleteAnnouncement, getAnnouncementById } from '../controllers/announcementController.js';
import multer from "multer";

const announcementRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, colback) => {
        return colback(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage});

// post method with middleware to upload image, and "image" is the name of file when make post for data 
announcementRouter.post("/add-announcement",upload.single("image"), addAnnouncement);
announcementRouter.get("/all-announcement", allAnnouncement);
announcementRouter.post("/delete-announcement", deleteAnnouncement);
announcementRouter.post("/:slug", getAnnouncementById);

export default announcementRouter;
