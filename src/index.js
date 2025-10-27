import app from "./app.js";
import { PORT } from "./config.js";
import sequelize from "./db.js";

import { User } from "./models/user.model.js";
import { Task } from "./models/task.model.js";

async function syncTables() {
  try {
    await sequelize.query("DROP SCHEMA public CASCADE;");
    await sequelize.query("CREATE SCHEMA public;");

    await User.sync({ force: true }); // Esto crea la tabla User si no existe (y la elimina si existe)
    await Task.sync({ force: true }); // Esto crea la tabla Task si no existe (y la elimina si existe)
    
    console.log("Tablas Alteradas.♣");
  } catch (error) {
    console.error("\nError al sincronizar las tablas:", error);
  }
}

// await syncTables(); // Descomentar para sincronizar las tablas
// await sequelize.sync({alter:true});//sincroniza todas las tablas sin borrarlas
app.listen(PORT);
console.log("simon si jala en el puerto: ", PORT);
