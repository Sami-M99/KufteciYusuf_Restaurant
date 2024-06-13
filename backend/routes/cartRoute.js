import express from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js';
import authTokenMiddleware from '../middleware/authToken.js';

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", authTokenMiddleware, addToCart);
cartRouter.post("/remove-from-cart", authTokenMiddleware, removeFromCart);
cartRouter.post("/get-cart", authTokenMiddleware, getCart);

export default cartRouter;