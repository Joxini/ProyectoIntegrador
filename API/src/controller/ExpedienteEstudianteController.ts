import { Request, Response } from "express";
import { ExpedienteEstudiante } from "../entity/ExpedienteEstudiante";
import { AppDataSource } from "../data-source";



class ExpedienteEstudianteController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const RepoGeneral = AppDataSource.getRepository(ExpedienteEstudiante);

          
            const listaGeneral = await RepoGeneral.find({ relations: { estudiante: true} });
            if (listaGeneral.length == 0) {
              return resp.status(404).json({ mensaje: 'NO SE ENCONTRO RESULTADOS' });
            }
            return resp.status(200).json(listaGeneral);
          } catch (error) {
            return resp.status(400).json({ mensaje: error });
          }
        
    }


    static getById = async (req: Request, resp: Response)=>{

        try {
            const RepoGeneral = AppDataSource.getRepository(ExpedienteEstudiante);
            let IdExpediente, mostrar; 
            IdExpediente = parseInt(req.params["id"]); 
            if (!IdExpediente) {
                return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
            }
            
            try {
                mostrar = await RepoGeneral.findOneOrFail({where: {IdExpediente}, relations: {estudiante: true}}) 
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

    static delete = async (req: Request, resp: Response)=>{ //No se puede eliminar porque esta relacionada con otra

        let IdExpediente;
        try {
            IdExpediente = parseInt(req.params["id"]);
            if (!IdExpediente) {
                return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DE LA UBICACIÓN' })
            }

            const EliminarRepo = AppDataSource.getRepository(ExpedienteEstudiante);
      
            let eliminar;
            
            try {
                eliminar = await EliminarRepo.findOne({ where: { IdExpediente }})
            } catch (error) {
                return resp.status(404).json({ mensaje: 'NO SE ENCUENTRA EN LA BASE DE DATOS' })
            }
            try {
                await EliminarRepo.remove(eliminar)
                return resp.status(200).json({ mensaje: 'SE ELIMINO CORRECTAMENTE' })
            } catch (error) {
                return resp.status(400).json({ mensaje:error})
            }

        } catch (error) {
            return resp.status(404).json({ mensaje: 'NO SE PUDO ELIMINAR' })
        }
        
    }

}

export default ExpedienteEstudianteController;