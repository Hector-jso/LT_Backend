import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({
    required_error: "El nombre de usuario es obligatorio",
  }).min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z
    .string({
      required_error: "El email es obligatorio",
    })
    .email("El email no es válido")
    .min(5, "El email debe tener al menos 5 caracteres"),
  password: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const loginSchema = z.object({
  name: z
    .string({
      required_error: "El nombre de usuario es obligatorio",
    }).min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  password: z.string({
    required_error: "La contraseña es obligatoria",
  }).min(6, "La contraseña debe tener al menos 6 caracteres"),
});
