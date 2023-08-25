import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import * as jwt from "jsonwebtoken";
import { InicioSesion } from "../entity/inicioSesion";
import config from '../config/config';
import { validate } from "class-validator";


class AuthController {
  static login = async (req: Request, resp: Response) => {
    const { IdPersona, Clave } = req.body;

    if (!(IdPersona || Clave)) {
      return resp
        .status(400)
        .json({ mensaje: "Usuario o contraseña incorrecta." });
    }

    const repoUsuario = AppDataSource.getRepository(InicioSesion);
    let usuario: InicioSesion;
    try {
      usuario = await repoUsuario.findOneOrFail({ where: { IdPersona } });
    } catch (error) {
      return resp
        .status(400)
        .json({ mensaje: "Usuario o contraseña incorrecta." });
    }

    if (!usuario.checkPassword(Clave)) {
      return resp
        .status(400)
        .json({ mensaje: "Usuario o contraseña incorrecta." });
    }

    const token = jwt.sign({ IdPersona: usuario.IdPersona }, config.jwtSecret, {
      expiresIn: "5m",
    });

    return resp.status(200).json({
      token,
      role: usuario.Rol,
      cedula: usuario.IdPersona,
    });
  };

  static GetAll =async (req:Request, resp:Response) => {

    try {
      const InicioRepo = AppDataSource.getRepository(InicioSesion);
      const listaInicio = await InicioRepo.find();
      if (listaInicio.length == 0) {
        return resp.status(404).json({ mensaje: 'No se encontró resultados.' });
      }
      return resp.status(200).json(listaInicio);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }

  }
  
  static changePassword = async (req: Request, res: Response) => {
    const { IdPersona } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      res.status(400).json({ message: 'Old password & new password are required' });
    }

    const InicioRepository = AppDataSource.getRepository(InicioSesion);
    let persona: InicioSesion;

    try {
        persona = await InicioRepository.findOneOrFail(IdPersona);
    } catch (e) {
      res.status(400).json({ message: 'Somenthing goes wrong!' });
    }

    if (!persona.checkPassword(oldPassword)) {
      return res.status(401).json({ message: 'Check your old Password' });
    }

    persona.Clave = newPassword;
    const validationOps = { validationError: { target: false, value: false } };
    const errors = await validate(persona, validationOps);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    //Hash password
    persona.hashPassword();
    InicioRepository.save(persona);

    res.json({ message: 'Password change!' });
  };
}
export default AuthController;
