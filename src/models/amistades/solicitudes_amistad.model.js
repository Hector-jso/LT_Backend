import { DataTypes } from "sequelize";
import sequelize from "../db.js";

export const SolicitudAmistad = sequelize.define("SolicitudAmistad", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estado: {
    type: DataTypes.ENUM("pendiente", "aceptada", "rechazada"),
    defaultValue: "pendiente",
  },
  emisor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receptor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
