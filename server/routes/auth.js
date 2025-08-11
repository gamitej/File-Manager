import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get("/validate", authMiddleware, (req, res) => {
  return res.json({ valid: true, userId: req.userId });
});

export default router;
