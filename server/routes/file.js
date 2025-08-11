import express from "express";
import {
  getFiles,
  deleteFile,
  uploadFile,
  downloadFile,
} from "../controllers/fileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import fileOwnerMiddleware from "../middleware/fileOwnerMiddleware.js";

const router = express.Router();

router.post("/upload", authMiddleware, uploadFile.single("file"), uploadFile);
router.get("/folder/:folderId", authMiddleware, getFiles);
router.get("/:id/download", fileOwnerMiddleware, downloadFile);
router.delete("/:id", fileOwnerMiddleware, deleteFile);

export default router;
