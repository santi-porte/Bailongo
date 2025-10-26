import express from "express";
import { createArtist, getArtist, getArtists } from "../controllers/artistControllers.js";

const router = express.Router();

router.get("/", getArtists);
router.get("/search", getArtist);
router.post("/createArtist", createArtist)

export default router;
