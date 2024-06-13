import mongoose from "mongoose";
import slugify from 'slugify';

const announcementSchema = new mongoose.Schema({
    title: {type: String, required:true},
    image: {type:String, required:true},
    description: {type: String, required:true},
    date: {type: Date, default: Date.now()},
    slug: { type: String, unique: true },
});

announcementSchema.pre('save', function (next) {
    if (this.isModified('title')) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
  });

// it means if model is alleady created || or create a new model
const announcementModel = mongoose.models.announcement || mongoose.model("announcement", announcementSchema);

export default announcementModel;

