import express from "express";
import { getUsers, getUser, createUser , loginUser } from "../controllers/usersControllers.js";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddlewares.js";

const router = express.Router();

router.post("/login", loginUser);

// Solo admin puede listar o crear usuarios
router.get("/", authMiddleware, authorizeRoles("admin"), getUsers);
router.post("/", authMiddleware, authorizeRoles("admin"), createUser);

// Admin o usuario propio puede ver su info
router.get("/find", authMiddleware, getUser);

export default router;