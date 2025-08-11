import sequelize from "./db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "User",
  {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);

const Folder = sequelize.define(
  "Folder",
  {
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);

const File = sequelize.define(
  "File",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    path: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);

User.hasMany(Folder, { foreignKey: "userId", onDelete: "CASCADE" });
Folder.belongsTo(User, { foreignKey: "userId" });
Folder.hasMany(File, { foreignKey: "folderId", onDelete: "CASCADE" });
File.belongsTo(Folder, { foreignKey: "folderId" });
File.belongsTo(User, { foreignKey: "userId" });

export { User, Folder, File };
