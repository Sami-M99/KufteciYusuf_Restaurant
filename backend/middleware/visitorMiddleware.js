// middleware/visitorMiddleware.js
import visitorModel from '../models/visitorModel.js';

let onlineVisitors = 0;

const updateVisitors = async (req, res, next) => {
    onlineVisitors++;
    await visitorModel.updateOne({}, { $inc: { totalVisitors: 1 }, $set: { onlineVisitors } }, { upsert: true });
    
    res.on('finish', async () => {
        onlineVisitors--;
        await visitorModel.updateOne({}, { $set: { onlineVisitors } });
    });

    next();
};

export default updateVisitors;
