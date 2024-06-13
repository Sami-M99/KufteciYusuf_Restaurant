// routes/visitorRouter.js
import express from 'express';
import { getVisitorsCount } from '../controllers/visitorController.js';
import updateVisitors from '../middleware/visitorMiddleware.js';

const visitorRouter = express.Router();

visitorRouter.use(updateVisitors); // Apply middleware to all routes
visitorRouter.get('/visitors', getVisitorsCount);

export default visitorRouter;
