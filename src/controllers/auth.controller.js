import { User } from "../models/user.model.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      password,
    });

    const createdUser = await User.findByPk(newUser.id, {
      attributes: [
        "id",
        "name",
        "email",
      ],
    });
    console.log("\nUsuario registrado:\n", createdUser);
    res.send("Registro de usuario:\n", createdUser);
  } catch (error) {
    console.error("\nError al registrar el usuario:\n", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const login = (req, res) => {
  res.send("Inicio de sesión de usuario");
};
