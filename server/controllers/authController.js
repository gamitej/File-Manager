import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models.js";

dotenv.config();

const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = process.env;

export async function register(req, res) {
  const { username, password } = req.body;
  try {
    // check valid req body
    if (!username || !password)
      res.status(401).json({ error: "username or Password can't be empty" });

    // create hash password
    const hash = await bcrypt.hash(password, 10);

    // create new user
    await User.create({ username, password_hash: hash });
    return res.status(201).json({ message: "User Registered!" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  try {
    // check valid request
    if (!username || !password)
      res.status(401).json({ error: "Invalid credentials" });

    // check valid username
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // check valid password
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    // create new token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.status(200).json({ message: "Login successfull!", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
