import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generarToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// Registro
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const nuevoUsuario = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    const token = generarToken(nuevoUsuario);
    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: nuevoUsuario._id,
        name: nuevoUsuario.name,
        email: nuevoUsuario.email,
        role: nuevoUsuario.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const passwordCorrecta = await usuario.matchPassword(password);
    if (!passwordCorrecta) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = generarToken(usuario);
    res.json({
      message: "Inicio de sesión exitoso",
      user: {
        id: usuario._id,
        name: usuario.name,
        email: usuario.email,
        role: usuario.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};