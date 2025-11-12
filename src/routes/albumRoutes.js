import express from "express";
import {
  getAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from "../controllers/albumControllers.js";

const router = express.Router();

router.get("/", getAlbums);
router.get("/search", getAlbum);
router.post("/createAlbum", createAlbum);
router.put("/updateAlbum/:id", updateAlbum);
router.delete("/deleteAlbum/:id", deleteAlbum);

export default router;