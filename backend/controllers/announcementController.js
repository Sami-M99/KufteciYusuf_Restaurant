import slugify from 'slugify';
import announcementModel from '../models/announcementModel.js';
import fs from "fs";  // The Node.js [file system] module allows you to work with the file system on your computer.

// Add Announcement item
const addAnnouncement = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const announcement = new announcementModel({
        title: req.body.title,
        description: req.body.description,
        image: image_filename,
        slug: slugify(req.body.title, { lower: true, strict: true })
    });

    try {
        await announcement.save();
        res.json({ success: true, message: "Duyuru Yüklendi" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Duyuru Yüklenmedi, bir hata oluştu !!!" });
    }
}

// All Announcement list
const allAnnouncement = async (req, res) => {
    try {
        const announcements = await announcementModel.find({});
        res.json({ success: true, data: announcements });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "There is error when fetch Announcements !!!" });
    }
}

// Remove Announcement item
const deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await announcementModel.findById(req.body.id);
        fs.unlink(`uploads/${announcement.image}`, () => {});  // this to delete image from our uploads folder

        await announcementModel.findByIdAndDelete(req.body.id);  // this to delete food data from database

        res.json({success: true, message: "Duyuru Silindi"})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Duyuru Silimedi, bir hata oluştu!!!" });
    }
}

// Get Announcement by ID
const getAnnouncementById = async (req, res) => {
    try {
        const announcement = await announcementModel.findOne({ slug: req.params.slug });
        if (!announcement) {
            return res.json({ success: false, message: "Duyuru Bulunmamaktadır" });
        }
        res.json({ success: true, data: announcement });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Duyuru alırkan Hata oluştu !!!" });
    }
}

export { addAnnouncement, allAnnouncement, deleteAnnouncement, getAnnouncementById};
