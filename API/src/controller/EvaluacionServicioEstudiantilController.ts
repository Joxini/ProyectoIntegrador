import { Request, Response } from "express";
import { EvaluacionServicioEstudiantil } from "../entity/evaluacionServicioEstudiantil";
import { AppDataSource } from "../data-source";

/* El código está definiendo una clase llamada `EvaluacionServicioEstudiantilController`. Esta clase es
responsable de manejar las solicitudes HTTP relacionadas con la entidad
`EvaluacionServicioEstudiantil`. Contiene métodos estáticos para manejar diferentes operaciones
CRUD, como recuperar todas las evaluaciones, recuperar una evaluación específica por ID, agregar una
nueva evaluación, actualizar una evaluación existente y eliminar una evaluación. */
class EvaluacionServicioEstudiantilController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const RepoGeneral = AppDataSource.getRepository(EvaluacionServicioEstudiantil);

          
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
            const RepoGeneral = AppDataSource.getRepository(EvaluacionServicioEstudiantil);
            let IdEvaluacion, mostrar; 
            IdEvaluacion = parseInt(req.params["id"]); 
            if (!IdEvaluacion) {
                return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
            }
            
            try {
                mostrar = await RepoGeneral.findOneOrFail({where: {IdEvaluacion}, relations: {estudiante: true}}) 
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

    static delete = async (req: Request, resp: Response)=>{

        let IdEvaluacion;
        try {
            IdEvaluacion = parseInt(req.params["id"]);
            if (!IdEvaluacion) {
                return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DE LA UBICACIÓN' })
            }

            const EliminarRepo = AppDataSource.getRepository(EvaluacionServicioEstudiantil);
      
            let eliminar;
            
            try {
                eliminar = await EliminarRepo.findOne({ where: { IdEvaluacion }})
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

export default EvaluacionServicioEstudiantilController;