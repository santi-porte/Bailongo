import User from "../models/User.js";

// ============
// GET
// ============

// obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "Usuarios no encontrados" });
    }
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los usuarios", errorMsg: error });
  }
};

// obtener usuario por 'email'
export const getUser = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email necesario para la búsqueda" });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al buscar usuario", errorMsg: error });
  }
};

// ============
// POST
// ============

// crear usuario
export const createUser = async (req, res) => {
  const { name, age, email, password } = req.body ?? {};
  if (!name || !age || !email || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Ya existe un usuario con ese email" });
    }
    const newUser = await User.create({ name, age, email, password });
    return res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el usuario", errorMsg: error });
  }
};
