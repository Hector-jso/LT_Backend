import { DataTypes } from "sequelize";
import sequelize from "../db.js";

export const HistorialPartidas = sequelize.define("HistorialPartidas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  // Puedes agregar otros campos relacionados con los juegos
  // points_{nombre_juego}: {
  //   type: DataTypes.INTEGER,
  //   defaultValue: 0,
  // },
});
