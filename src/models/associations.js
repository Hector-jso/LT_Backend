import { User } from "./user.model.js";
import { Task } from "./task.model.js";

// Usuario → Tareas
User.hasMany(Task, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Task.belongsTo(User, { foreignKey: "userId" });
