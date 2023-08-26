import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config"

/* El código define y exporta una función llamada `checkjwt`. Esta función toma tres parámetros: `req`,
`res` y `next`, que son objetos que representan la solicitud HTTP, la respuesta y la siguiente
función de middleware en la cadena, respectivamente. */
export const checkjwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["token"];

  if (!token) {
    res.status(401).json("Acceso no autorizado.");
  }
  let payload;
  try {
    payload = jwt.verify(token, config.jwtSecret);
    res.locals.payload = payload;
  } catch (error) {
    res.status(401).json("Acceso no autorizado.");
  }

  const { IdPersona } = payload;
  const tokenNew = jwt.sign({ IdPersona }, config.jwtSecret, { expiresIn: "5m" });
  res.setHeader("token", tokenNew);

  next();
};
