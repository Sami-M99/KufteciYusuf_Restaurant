import express from 'express';
import authTokenMiddleware from '../middleware/authToken.js';
import { placeOrder, userOrders, verifyOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/place", authTokenMiddleware, placeOrder); 
orderRouter.get("/verify-order", verifyOrder); 
orderRouter.get("/user-order", authTokenMiddleware, userOrders); 

export default orderRouter;