import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRouter.js"
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import announcementRouter from "./routes/announcementRoute.js";

import dotenv from 'dotenv';
import visitorRouter from "./routes/visitorRouter.js";
dotenv.config();
// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json())  // to get request from frontend to backend


app.use(cors())   // we can access the backend from any frontend

// databse connection
connectDB();

// API endpoints
app.use("/food", foodRouter);
app.use("/images", express.static('uploads'));  //to get any image uploaded ==> http://localhost:4000/images/{image name}
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/announcement", announcementRouter);
app.use('/api', visitorRouter);

app.get("/", (req,res) => {
    res.send("API Working");
});


// run express server
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});


// mongodb+srv://KufteciYusuf:bEk9ubuU2FhXqt6B@cluster0.9e7bqyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://KufteciYusuf:bEk9ubuU2FhXqt6B@cluster0.9e7bqyo.mongodb.net/?b