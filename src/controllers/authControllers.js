import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ============
// POST
// ============

// Login

const generateAccessToken = (user) => {
  const encryptedData = { id: user.id, email: user.email };
  const JWT_KEY = process.env.JWT_SECRET;
  return jwt.sign(encryptedData, JWT_KEY, { expiresIn: "1h" });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan Email o Contraseña" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Email o Password incorrectos" });
    }

    const accesToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({ accesToken: accesToken });

    if (user.password === password) {
    }
  } catch (error) {
    res.status(400).json({
      error: "No se pudo encontrar el usuario ",
      errorMsg: error,
    });
  }
};

export const refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ error: " No hay refresh token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accesToken: newAccessToken });
  } catch (error) {}
};

export const logout = (req, res) => {
  res.clearCookie("RefreshTocken");
  res.json({ msg: "Logout exitoso!" });
};
