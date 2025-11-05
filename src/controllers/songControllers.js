import Song from "../models/Song.js";
import { getArtistByName as findArtistByName } from "./artistControllers.js";


// ============
// GET
// ============

// obtener todas las canciones
export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find().populate("artista album");

    if (!songs || songs.length === 0) {
      return res.status(404).json({ error: "Canciones no encontradas" });
    }
    res.status(200).json(songs);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener las canciones", errorMsg: error });
  }
};

// obtener canción por título
export const getSong = async (req, res) => {
  const { titulo } = req.query;

  if (!titulo) {
    return res.status(400).json({ error: "Título necesario para la búsqueda" });
  }

  try {
    const song = await Song.find({
      titulo: {
        $regex: `^${titulo}`,
        $options: "i",
      },
    }).populate("artista album");

    if (!song || song.length === 0) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }

    return res.status(200).json(song);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al buscar la canción", errorMsg: error });
  }
};

// ============
// POST
// ============

// crear canción
export const createSong = async (req, res) => {
  const { titulo, duracion, genero, artistName, album, comentarios } = req.body ?? {};

  if (!titulo || !duracion || !genero || !artistName) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {


    // Buscar el artista por nombre
    const artista = await findArtistByName(artistName);
    if (!artista) {

      console.error("Artista no encontrado con el nombre proporcionado");
    }

    console.log("Artista encontrado:", artista);
    const artistaId = artista._id;

    const existingSong = await Song.findOne({
      titulo: { $regex: `^${titulo}$`, $options: "i" },
      artista: artistaId,
    });

    if (existingSong) {
      return res
        .status(409)
        .json({ error: "Ya existe una canción con ese título para este artista" });
    }

    const newSong = await Song.create({
      titulo,
      duracion,
      genero,
      artista: artistaId,
      album,
      comentarios: comentarios || [],
    });
    console.log(newSong);

    return res.status(201).json(newSong);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al crear la canción", errorMsg: error });
  }
};

// ============
// PUT
// ============

// actualizar canción
export const updateSong = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSong = await Song.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSong) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }

    return res.status(200).json(updatedSong);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al actualizar la canción", errorMsg: error });
  }
};

// ============
// DELETE
// ============

// eliminar canción
export const deleteSong = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSong = await Song.findByIdAndDelete(id);

    if (!deletedSong) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }

    return res.status(200).json({ message: "Canción eliminada correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al eliminar la canción", errorMsg: error });
  }
};