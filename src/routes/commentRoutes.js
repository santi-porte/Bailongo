import express from "express";
import { addCommentToSong } from "../controllers/commentControllers";

const router = express.Router();

router.post("/addCommentToSong/:songId", addCommentToSong);

export default router;