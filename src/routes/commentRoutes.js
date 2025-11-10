import express from "express";
import { addCommentToAlbum, addCommentToSong } from "../controllers/commentControllers.js";
import { protectRoute } from "../middleware/authMiddlewares.js";

const router = express.Router();

router.post("/songs/:id/comment", protectRoute, addCommentToSong);
router.post("/albums/:id/comment", protectRoute, addCommentToAlbum);
export default router;