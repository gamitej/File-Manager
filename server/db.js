import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { DB_NAME, DB_PASS, DB_USER, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "postgres",
});

export default sequelize;
