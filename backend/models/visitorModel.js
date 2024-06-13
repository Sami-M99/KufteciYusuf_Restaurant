// models/visitorModel.js
import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
    totalVisitors: { type: Number, default: 0 },
    onlineVisitors: { type: Number, default: 0 },
});

const visitorModel = mongoose.models.visitor || mongoose.model('visitor', visitorSchema);

export default visitorModel;
