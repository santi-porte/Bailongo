import express from "express";
import { addCommentToAlbum, addCommentToSong } from "../controllers/commentControllers.js";
import { authMiddleware } from "../middleware/authMiddlewares.js";

const router = express.Router();

router.post("/songs/:id/comment", authMiddleware, addCommentToSong);
router.post("/albums/:id/comment", authMiddleware, addCommentToAlbum);
export default router;