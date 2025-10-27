import jwt from "jsonwebtoken";
import { MYSECRETPASSWORD } from "../config.js";

export const authRequired = (req, res, next) => {
  const {token} = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
  }

  jwt.verify(token, MYSECRETPASSWORD, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido." });
    }

    req.user = decoded;
    console.log("Token verificado. ID de usuario:", decoded);
  });
  next();
};
