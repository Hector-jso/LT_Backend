export const validateSchema = (schema) => (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "El cuerpo de la solicitud está vacío" });
    }
    schema.parse(req.body);
    next();
  } catch (error) {
    const messages = error.issues?.map((err) => `${err.message}`) || [error.message];
    res.status(400).json({ errors: messages });
  }
};
