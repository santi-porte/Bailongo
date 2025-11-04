import Album from "../models/Album.js";

// ============
// GET
// ============

// obtener todos los álbumes
export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate("artista canciones");

    if (!albums || albums.length === 0) {
      return res.status(404).json({ error: "Álbumes no encontrados" });
    }
    res.status(200).json(albums);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los álbumes", errorMsg: error });
  }
};

// obtener álbum por 'título'
export const getAlbum = async (req, res) => {
  const { titulo } = req.query;

  if (!titulo) {
    return res.status(400).json({ error: "Título necesario para la búsqueda" });
  }

  try {
    const album = await Album.find({
      titulo: {
        $regex: `^${titulo}`,
        $options: "i",
      },
    }).populate("artista canciones");

    if (!album || album.length === 0) {
      return res.status(404).json({ error: "Álbum no encontrado" });
    }

    return res.status(200).json(album);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al buscar el álbum", errorMsg: error });
  }
};

// ============
// POST
// ============

// crear álbum
export const createAlbum = async (req, res) => {
  const { titulo, artista, canciones } = req.body ?? {};

  if (!titulo || !artista) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    const existingAlbum = await Album.findOne({
      titulo: { $regex: `^${titulo}$`, $options: "i" },
      artista,
    });

    if (existingAlbum) {
      return res
        .status(409)
        .json({ error: "Ya existe un álbum con ese título para este artista" });
    }

    const newAlbum = await Album.create({
      titulo,
      artista,
      canciones: canciones || [],
    });

    return res.status(201).json(newAlbum);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al crear el álbum", errorMsg: error });
  }
};

// ============
// PUT
// ============

// actualizar álbum
export const updateAlbum = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedAlbum = await Album.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedAlbum) {
      return res.status(404).json({ error: "Álbum no encontrado" });
    }

    return res.status(200).json(updatedAlbum);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al actualizar el álbum", errorMsg: error });
  }
};

// ============
// DELETE
// ============

// eliminar álbum
export const deleteAlbum = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAlbum = await Album.findByIdAndDelete(id);

    if (!deletedAlbum) {
      return res.status(404).json({ error: "Álbum no encontrado" });
    }

    return res.status(200).json({ message: "Álbum eliminado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al eliminar el álbum", errorMsg: error });
  }
};