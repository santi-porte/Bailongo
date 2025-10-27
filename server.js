import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import usersRoutes from "./src/routes/usersRoutes.js";
import artistsRoutes from "./src/routes/artistsRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/artists", artistsRoutes);

app.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:", PORT);
});
