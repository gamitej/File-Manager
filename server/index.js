import cors from "cors";
import express from "express";
import sequelize from "./db.js";
import authRoutes from "./routes/auth.js";
// import fileRoutes from "./routes/file.js";
// import foldersRoutes from "./routes/folders.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
// app.use("/api/files", fileRoutes);
// app.use("/api/folders", foldersRoutes);

app.get("/", (_req, res) => {
  res.send("File manager is running");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected");
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("❌ Unable to connect to DB:", err);
  });
