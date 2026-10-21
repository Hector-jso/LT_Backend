import { DataTypes } from "sequelize";
import sequelize from "../../db";

export const Ganancias = sequelize.define("Ganancias", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
  // Puedes agregar otros campos relacionados con los juegos
  // np_{nombre_juego}: {
  //   type: DataTypes.INTEGER,
  //   defaultValue: 0,
  // },
});