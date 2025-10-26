import express from "express";
import { createUser, getUser, getUsers } from "../controllers/usersControllers.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/search", getUser);
router.post("/createUser", createUser);

export default router;
