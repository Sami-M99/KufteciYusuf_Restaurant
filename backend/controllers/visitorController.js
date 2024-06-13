// controllers/visitorController.js
import visitorModel from '../models/visitorModel.js';

const getVisitorsCount = async (req, res) => {
    try {
        const visitors = await visitorModel.findOne({});
        res.json({ success: true, visitors });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Failed to retrieve visitors count.' });
    }
};

export { getVisitorsCount };
