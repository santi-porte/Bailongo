import mongoose from "mongoose";

const albumSchema = mongoose.Schema(
  {
    titulo: { type: String, required: true },
    artista: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
    canciones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true }
);

export default mongoose.model("Album", albumSchema);