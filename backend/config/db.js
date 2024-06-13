import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
    await mongoose
        .connect('mongodb+srv://KufteciYusuf:bEk9ubuU2FhXqt6B@cluster0.9e7bqyo.mongodb.net/KufteciYusuf')
        .then(() => console.log('Database connectting'));
}