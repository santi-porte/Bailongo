import express from "express";
import {
  getSongs,
  getSong,
  createSong,
  updateSong,
  deleteSong,
} from "../controllers/songController.js";

const router = express.Router();

router.get("/", getSongs); 
router.get("/search", getSong); 
router.post("/createSong", createSong); 
router.put("/updateSong/:id", updateSong); 
router.delete("/deleteSong/:id", deleteSong); 

export default router;