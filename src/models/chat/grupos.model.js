import { DataTypes } from "sequelize";
import sequelize from "../db.js";

export const Grupo = sequelize.define("Grupo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});
