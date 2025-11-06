import Song from "../models/Song.js";
import Comment from "../models/Comment.js";


const addComment = async (model, id, userId, text) => {
    const objetivoAComentar = await model.findById(id);
    try {
        if (!objetivoAComentar) {
            console.error("Elemento no encontrado");
        }

        const nuevoComentario = await Comment.create({
            text,
            user: userId,
        });

        objetivoAComentar.comentarios.push(nuevoComentario._id);
        await objetivoAComentar.save();

        return nuevoComentario.populate({ path: 'user', select: 'name email' });
    } catch (error) {
        console.error("Error al agregar comentario:", error);
    }
};

export const addCommentToSong = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body ?? {};
    const userId = req.user._id;
    if (!text) {
        return res.status(400).json({ error: "Texto del comentario es obligatorio" });
    }
    try {
        const nuevoComentario = await addComment(Song, id, userId, text);
        res.status(201).json(nuevoComentario);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar comentario a la canción", errorMsg: error });
    }
};