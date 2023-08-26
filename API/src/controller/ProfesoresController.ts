import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Profesor } from "../entity/profesor";

/* La `clase ProfesoresController {` está definiendo una clase de controlador para manejar solicitudes
relacionadas con profesores. Contiene métodos estáticos para manejar diferentes solicitudes HTTP,
como obtener todos los profesores, obtener un profesor por ID, agregar un nuevo profesor, actualizar
un profesor y eliminar un profesor. */
class ProfesoresController {

    static getAll = async (req: Request, resp: Response) => {

        try {
            const ProfessRepo = AppDataSource.getRepository(Profesor);
            const listaProfesores = await ProfessRepo.find({
                relations: { persona: true }
            });
            if (listaProfesores.length == 0) {
                return resp.status(404).json({ mensaje: 'NO SE ENCONTRO RESULTADOS' });
            }
            return resp.status(200).json(listaProfesores);
        } catch (error) {
            return resp.status(400).json({ mensaje: error });
        }

    }


    static getById = async (req: Request, resp: Response) => {

        try {
            const RepoProfesor = AppDataSource.getRepository(Profesor);
            let IdProfesor, mostrar;
            IdProfesor = parseInt(req.params["id"]); //Busca por medio de la placa
            if (!IdProfesor) {
                return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
            }

            try {
                mostrar = await RepoProfesor.findOneOrFail({ where: { IdProfesor }, relations: { persona: true } }) //Verifica si esta activo
            } catch (error) {
                return resp.status(404).json({ mensaje: "NO EXISTE EN LA BASE DE DATOS" })
            }
            return resp.status(200).json(mostrar);
        } catch (error) {
            return resp.status(404).json({ mensaje: "HUBO UN ERROR AL PROCESAR LOS DATOS" })
        }
    }

    static add = async (req: Request, resp: Response) => {

    }

    static update = async (req: Request, resp: Response) => {

    }

    static delete = async (req: Request, resp: Response) => {

        let IdProfesor;
        try {
            IdProfesor = parseInt(req.params["id"]);
            if (!IdProfesor) {
                return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DEL PROFESOR' })
            }

            const ProfesorRepo = AppDataSource.getRepository(Profesor);

            let Profes;

            try {
                Profes = await ProfesorRepo.findOne({ where: { IdProfesor } })
            } catch (error) {
                return resp.status(404).json({ mensaje: 'NO SE ENCUENTRA EN LA BASE DE DATOS' })
            }
            try {
                await ProfesorRepo.remove(Profes)
                return resp.status(200).json({ mensaje: 'SE ELIMINO CORRECTAMENTE' })
            } catch (error) {
                return resp.status(400).json({ mensaje: error })
            }

        } catch (error) {
            return resp.status(404).json({ mensaje: 'NO SE PUDO ELIMINAR' })
        }


    }

}

export default ProfesoresController;