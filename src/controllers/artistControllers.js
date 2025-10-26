import Artist from "../models/Artist.js";

// ============
// GET
// ============

// obtener todos los artistas
export const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find();

    if (!artists || artists.length === 0) {
      return res.status(404).json({ error: "Artistas no encontrados" });
    }
    res.status(200).json(artists);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los artistas", errorMsg: error });
  }
};

// obtener artista por 'nombre'
export const getArtist = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Nombre necesario para la búsqueda" });
  }
  try {
    const artist = await Artist.find({
      name: {
        $regex: `^${name}`,
        $options: "i",
      },
    });
    if (!artist || artist.length === 0) {
      return res.status(400).json({ error: "Artista no encontrado" });
    }
    return res.status(200).json(artist);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al buscar el artista", errorMsg: error });
  }
};

// ============
// POST
// ============

// crear artista
export const createArtist = async (req, res) => {
  const { name, country, genres } = req.body ?? {};
  if (!name || !country || !Array.isArray(genres) || genres.length === 0) {
    return res.status(400).json({ error: "Faltan datos" });
  }
  try {
    const existingArtist = await Artist.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
    });
    if (existingArtist) {
      return res
        .status(409)
        .json({ error: "Ya existe un artista con ese nombre" });
    }
    const newArtist = await Artist.create({ name, country, genres });
    return res.status(201).json(newArtist);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al generar el artista", errorMsg: error });
  }
};
