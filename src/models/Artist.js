import mongoose from "mongoose";

const artistSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    genres: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default mongoose.model("Artist", artistSchema);
