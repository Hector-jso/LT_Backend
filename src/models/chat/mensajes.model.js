import { DataTypes } from "sequelize";
import sequelize from "../db.js";

export const Mensaje = sequelize.define("Mensaje", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  chat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  emisor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});
