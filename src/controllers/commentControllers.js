import Song from "../models/Song.js";
import Comment from "../models/Comment.js";
import Album from "../models/Album.js";


const addComment = async (model, id, userId, text) => {
    try {
        const objetivoAComentar = await model.findById(id);

        if (!objetivoAComentar) {
            throw new Error("Elemento no encontrado");
        }


        if (!userId) {
            throw new Error("Usuario no autenticado");
        }

        const nuevoComentario = await Comment.create({
            text: text.trim(),
            user: userId,
        });

        objetivoAComentar.comentarios.push(nuevoComentario._id);
        await objetivoAComentar.save();

        return await Comment.findById(nuevoComentario._id)
            .populate({ path: 'user', select: 'name email' });
    } catch (error) {
        console.error("Error al agregar comentario:", error);
        throw error;
    }
};

export const addCommentToSong = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body ?? {};

    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Usuario no autenticado" });
    }
    const userId = req.user.id;
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

export const addCommentToAlbum = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body ?? {};

    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Usuario no autenticado" });
    }
    const userId = req.user.id;
    if (!text) {
        return res.status(400).json({ error: "Texto del comentario es obligatorio" });
    }
    try {
        const nuevoComentario = await addComment(Album, id, userId, text);
        res.status(201).json(nuevoComentario);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar comentario al álbum", errorMsg: error });
    }
};