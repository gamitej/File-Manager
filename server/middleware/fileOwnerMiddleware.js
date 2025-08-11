export default async function fileOwnerMiddleware(req, res, next) {
  const userId = req.userId;
  const fileId = req.params.id;

  try {
    const file = await File.findByPk(fileId);
    if (!file || file.userId !== userId) {
      return res.status(403).json({ error: "Access Denied" });
    }

    req.file = file;
    next();
  } catch (error) {
    return res.status(400).json({ error: "File access check failed!" });
  }
}
