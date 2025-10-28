import { Task } from "../models/task.model.js";
import sequelize from "../db.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.status(200).json(tasks);
    console.log("Tareas obtenidas:\n", tasks.map(task => task.title));
  } catch (error) {
    res.status(500).json({ message: "\nError al obtener las tareas", error: error.message });
  }
};

export const createTask = async (req, res) => {
  const { title, description, date } = req.body;

  const taskDate = date || new Date();
  try {
    if (!title || !description || !taskDate) {
      return res.status(400).json({ message: `Faltan datos para crear la tarea: ${!taskDate ? "date" : ""}${!title ? "title" : ""}${!description ? "description" : ""}` });
    }
    const newTask = await Task.create({ title, description, taskDate, userId: req.user.id });

    const taskJson = ({
      title: newTask.title,
      description: newTask.description,
      date: newTask.date,
      userId: newTask.userId,
    })

    res.status(201).json(taskJson);
    console.log("Tarea creada:\n", newTask.title);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea", error: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task no encontrada" });
    }
    const taskCheckUser = task.userId === req.user.id;
    if (!taskCheckUser) {
      return res.status(403).json({ message: "No autorizado para ver esta task" });
    }
    res.status(200).json(task);
    console.log("Tarea obtenida:\n", task.title);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la task", error: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Task no encontrada" });
    }
    const taskCheckUser = task.userId === req.user.id;
    if (!taskCheckUser) {
      return res.status(403).json({ message: "No autorizado para actualizar esta task" });
    }

    await task.update({
      title: title || task.title,
      description: description || task.description,
      date: date || task.date,
    });

    const taskJson = ({
      title: task.title,
      description: task.description,
      date: task.date,
    })

    res.status(201).json(taskJson);
    console.log("\nTarea actualizada:\n", task.title);
  } catch (error) {
    res.status(500).json({ message: "Error el actualizar la task", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "\nTask requiere ID" });
  }

  const transaction = await sequelize.transaction();
  
  try {
    const task = await Task.findByPk(id, { transaction });
    if (!task) {
      await transaction.rollback();
      return res.status(404).json({ message: "Task no encontrada" });
    }
    const taskCheckUser = task.userId === req.user.id;
    if (!taskCheckUser) {
      await transaction.rollback();
      return res.status(403).json({ message: "No autorizado para eliminar esta task" });
    }
    await task.destroy({ transaction });
    await transaction.commit();
    res.status(204).send();
    console.log("\nTarea eliminada:\n", task.title);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error al eliminar la task", error: error.message });
  }
};
