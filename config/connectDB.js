import mongoose from "mongoose";

export default function connectDB(){
    mongoose.connect("mongodb://localhost:27017/Notes")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
}