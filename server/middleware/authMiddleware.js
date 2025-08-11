import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const { JWT_SECRET_KEY } = process.env;

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.staus(401).json({ error: "Invalid token!" });

  try {
    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, JWT_SECRET_KEY);
    req.userId = payload.userId;
    next();
  } catch (error) {
    return res.staus(500).json({ error: "Invalid token or expired" });
  }
}
