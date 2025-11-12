import mongoose from "mongoose";

const songSchema = mongoose.Schema(
  {
    titulo: { type: String, required: true },
    duracion: { type: Number, required: true }, // en segundos
    genero: { type: String, required: true },
    artista: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
    fechaDeSubida: { type: Date, default: Date.now },
    comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export default mongoose.model("Song", songSchema);