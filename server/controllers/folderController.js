import { Folder } from "../models.js";

export async function createFolder(req, res) {
  const userId = req.userId;
  const { name, parentId } = req.body;
  try {
    const folder = await Folder.create({
      name,
      userId,
      parentId: parentId || null,
    });

    return res
      .status(201)
      .json({ message: "Folder created successfully", folder });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create folder!" });
  }
}

export async function getFolders(req, res) {
  const userId = req.userId;
  try {
    const folders = await Folder.findAll({ where: { userId } });
    return res.status(200).json({ folders });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch folders" });
  }
}

export async function deleteFolder(req, res) {
  const { id } = req.params;
  try {
    await Folder.destroy({ where: { id } });

    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete folder" });
  }
}
