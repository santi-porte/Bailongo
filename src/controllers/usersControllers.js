import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Obtener todos los usuarios (solo admin)
export const getUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Solo los administradores pueden ver todos los usuarios" });
    }

    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "Usuarios no encontrados" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios", errorMsg: error });
  }
};

// Obtener usuario por email (admin o el propio usuario)
export const getUser = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: "Email necesario para la búsqueda" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Solo admin o el propio usuario
    if (req.user.role !== "admin" && req.user.email !== email) {
      return res.status(403).json({ message: "No puedes acceder a otro usuario" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar usuario", errorMsg: error });
  }
};

// Crear usuario (solo admin)
export const createUser = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Solo los administradores pueden crear usuarios" });
  }

  const { name, email, password, role } = req.body ?? {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Ya existe un usuario con ese email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role: role || "user" });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario", errorMsg: error });
  }
};