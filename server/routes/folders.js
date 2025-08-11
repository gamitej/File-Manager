import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getFolders,
  createFolder,
  deleteFolder,
} from "../controllers/folderController.js";

const router = express.Router();

router.post("/", authMiddleware, createFolder);
router.get("/", authMiddleware, getFolders);
router.delete("/:id", authMiddleware, deleteFolder);

export default router;
