import app from "./app.js";
import { PORT } from "./config.js";
import sequelize from "./db.js";

// Importar los modelos para que las asociaciones se apliquen
import { User } from "./models/user.model.js";
import { Task } from "./models/task.model.js";

// Importar las asociaciones
import "./models/associations.js";

// Función para sincronizar las tablas
async function syncTables() {
  try {
    await sequelize.query("DROP SCHEMA public CASCADE;");
    await sequelize.query("CREATE SCHEMA public;");

    // await User.sync({ force: true }); 
    // await Task.sync({ force: true }); 

    await sequelize.sync({ force: true });

    console.log("Tablas Alteradas.♣");
  } catch (error) {
    console.error("\nError al sincronizar las tablas:", error);
  }
}

// 🧠 OPCIÓN 1: borrar todo y recrear
// await syncTables();

// 🧠 OPCIÓN 2: solo actualizar estructuras sin borrar datos
// await sequelize.sync({ alter: true });
app.listen(PORT);
console.log("simon si jala en el puerto: ", PORT);
