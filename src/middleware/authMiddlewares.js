import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decodificado.id,
      email: decodificado.email
    }

    next();
  } catch (error) {
    return res.status(403).json({ error: "Token invalido o expirado" });
  }
};
