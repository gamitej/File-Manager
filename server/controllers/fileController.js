import path from "path";
import multer from "multer";
import express from "express";
import { File } from "../models.js";

export const uploadPath = multer({
  dest: path.join(path.resolve(), "server/uploads"),
});

const router = express.Router();

export async function uploadFile(req, res) {
  const file = req.file;
  const userId = req.userId;
  const { folderId } = req.body;
  try {
    const dbFile = await File.create({
      userId,
      folderId,
      path: file.path,
      name: file.originalname,
    });

    return res.status(200).json({ file: dbFile });
  } catch (error) {
    return res.status(400).json({ error: "File upload failed!" });
  }
}

export async function getFiles(req, res) {
  const userId = req.userId;
  const { folderId } = req.params;
  try {
    const files = await File.findAll({ where: { userId, folderId } });
    return res.status(200).json({ files });
  } catch (error) {
    return res.status(400).json({ error: "Failed to fetch files" });
  }
}

export async function downloadFile(req, res) {
  const file = req.file;
  return res.download(file.path, file.name);
}

export async function deleteFile(req, res) {
  const file = req.file;
  await file.destory();
  return res.status(200).json({ message: "File deleted" });
}
