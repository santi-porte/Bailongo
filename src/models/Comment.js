import e from "express";
import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        text: { type: String, required: true, trim: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);
export default mongoose.model("Comment", commentSchema);   