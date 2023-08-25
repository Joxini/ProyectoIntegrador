import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Estudiante } from "../entity/estudiante";

class EstudianteController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const EstudianteRepo = AppDataSource.getRepository(Estudiante);
            const listaEstudiante = await EstudianteRepo.find({
              relations: {persona: true,  profesor: true, ubicacion: true}
            });
            if (listaEstudiante.length == 0) {
              return resp.status(404).json({ mensaje: 'NO SE ENCONTRO RESULTADOS' });
            }
            return resp.status(200).json(listaEstudiante);
          } catch (error) {
            return resp.status(400).json({ mensaje: error });
          }
    }
        
    


    static getById = async (req: Request, resp: Response)=>{

        try {
            const RepoEstudiante = AppDataSource.getRepository(Estudiante);
            let IdEstudiante, mostrar; 
            IdEstudiante = parseInt(req.params["id"]); //Busca por medio de la placa
            if (!IdEstudiante) {
                return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
            }
            
            try {
                mostrar = await RepoEstudiante.findOneOrFail({where: {IdEstudiante}, relations: {persona: true,  profesor: true, ubicacion: true}}) //Verifica si esta activo
            } catch (error) {
                return resp.status(404).json({mensaje: "NO EXISTE EN LA BASE DE DATOS"})
            } 
            return resp.status(200).json(mostrar);
        } catch (error) {
            return resp.status(404).json({mensaje: "HUBO UN ERROR AL PROCESAR LOS DATOS"})
        }
        
    }

    static add = async (req: Request, resp: Response)=>{
        
    }

    static update = async (req: Request, resp: Response)=>{
        
    }

    static delete = async (req: Request, resp: Response)=>{ //No se puede eliminar porque tiene relación con otras

        let IdEstudiante;
        try {
            IdEstudiante = parseInt(req.params["id"]);
            if (!IdEstudiante) {
                return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID' })
            }

            const EstuRepo = AppDataSource.getRepository(Estudiante);
      
            let Discentes;
            
            try {
                Discentes = await EstuRepo.findOne({ where: { IdEstudiante }})
            } catch (error) {
                return resp.status(404).json({ mensaje: 'NO SE ENCUENTRA EN LA BASE DE DATOS' })
            }
            try {
                await EstuRepo.remove(Discentes)
                return resp.status(200).json({ mensaje: 'SE ELIMINO CORRECTAMENTE' })
            } catch (error) {
                return resp.status(400).json({ mensaje:error})
            }

        } catch (error) {
            return resp.status(404).json({ mensaje: 'NO SE PUDO ELIMINAR' })
        }

        
        
    }
        
    }


export default EstudianteController;