import { DataTypes } from "sequelize";
import sequelize from "../db.js";

export const Amistad = sequelize.define("Amistad", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id2: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
