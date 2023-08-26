import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { InicioSesion } from "../entity/inicioSesion";



/* El código define y exporta una función llamada `checkRoles`. Esta función toma una matriz de cadenas
llamadas "roles" como parámetro. */
export const checkRoles = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { IdPersona } = res.locals.payload;

    const inicioSesionRepo = AppDataSource.getRepository(InicioSesion);

    let persona: InicioSesion;
    try {
      persona = await inicioSesionRepo.findOneOrFail({ where: { IdPersona } });
    } catch (error) {
      res.status(400).json({ mensaje: "Error en roles" });
    }

    if (roles.includes(persona.Rol)) {
      next();
    }
    return res.status(401).json("Acceso no autorizado.");
  };
};
