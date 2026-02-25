import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    username: {type: String, required: true},
    postId: {type: Number, required: true},
    title: String,
    note: String
})

export default mongoose.model("content", contentSchema);