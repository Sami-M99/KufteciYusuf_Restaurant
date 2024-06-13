import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async (req, res) => {

    const frontendUrl = "http://localhost:5173";

    try {
        // Create a new order and save it in the database
        const newOrder = new orderModel({
            userId: req.body.userId,  // get userId from middleware authToken
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();

        // Cleaning the user's cartData
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

        // Create lineItems, necessary for Stripe payment, by items
        const lineItems = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        // Add "Delivery Charges" to lineItems
        lineItems.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`, 
        });

        // Send session as response
        res.json({success: true, session_url: session.url});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error in Order"});
    }
}

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true, message: "Paid"});
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Not Paid !?"});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error on verify order..."});
    }
}

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success: true, data: orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, data: "Error in userOrder"});
    }
}

export {placeOrder, verifyOrder, userOrders};
