import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken"
import { MYSECRETPASSWORD } from "../config.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userFoundUser = await User.findOne({ where: { name } });
    if (userFoundUser) {
      return res.status(400).json({ errors: ["Ya existe un usuario con ese nombre"] });
    }

    const userFoundEmail = await User.findOne({ where: { email } });
    if (userFoundEmail) {
      console.log(email);
      console.log(userFoundEmail);
      return res.status(400).json({ errors: ["Ya existe un usuario con ese correo"] });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
    });

    const createdUser = await User.findByPk(newUser.id, {
      attributes: ["id", "name", "email"],
    });

    console.log("Usuario registrado:\n", createdUser.name, createdUser.email);
    const token = await generateToken({ id: newUser.id });
    res.cookie("token", token);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error("\nError al registrar el usuario:\n", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const userFound = await User.findOne({ where: { name } });
    
    if (!userFound) {
      return res.status(400).json({ errors: "Usuario no encontrado" });
    }
    
    const isMatch = await bcrypt.compare(password, userFound.password);
    
    if (!isMatch) {
      return res.status(400).json({ errors: "Contraseña incorrecta" });
    }
    const token = await generateToken({ id: userFound.id });

    const userFoundJson = await User.findByPk(userFound.id, {
      attributes: ["id", "name", "email"],
    });

    console.log("Usuario a iniciado secion:\n", userFoundJson.name, userFoundJson.email);
    res.cookie("token", token);
    res.status(201).json(userFoundJson);
  } catch (error) {
    console.error("\nError al inciar secion del usuario:\n", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.status(200).json({ message: "Cierre de sesión exitoso" });
};

export const profile = async (req, res) => {
  const userFound = await User.findByPk(req.user.id);

  if (!userFound) {
    return res.status(400).json({ errors: "Usuario no encontrado" });
  }

  return res.json({
    // id: userFound.id,
    name: userFound.name,
    email: userFound.email,
  });
};

export const verifyToken = async (req, res) => {
  const {token} = req.cookies;

  if (!token) return res.status(401).json({errors: "No autorisado"});

  jwt.verify(token, MYSECRETPASSWORD, async (err, user) => {
    if (err) return res.status(401).json({errors: "No autorisado"})

    const userFound = await User.findByPk(user.id);
    if (!userFound) return res.status(401).json({errors: "No autorisado"});

    return res.json({
      id: userFound.id,
      name: userFound.name,
      email: userFound.email
    });
  })
} 