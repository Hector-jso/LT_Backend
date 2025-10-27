import jwt from "jsonwebtoken";
import { MYSECRETPASSWORD } from "../config.js";

export function generateToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload, 
      MYSECRETPASSWORD, 
      { expiresIn: "1h" }, 
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}
