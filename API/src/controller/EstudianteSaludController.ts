import { Request, Response } from "express";
import { EstudianteSalud } from "../entity/estudianteSalud";
import { AppDataSource } from "../data-source";

/* La `clase EstudianteSaludController` está definiendo una clase de controlador para manejar
solicitudes relacionadas con la entidad `EstudianteSalud`. Contiene métodos estáticos para manejar
diferentes operaciones CRUD, como obtener todos los registros de "EstudianteSalud", obtener un
registro de "EstudianteSalud" específico por ID, agregar un nuevo registro de "EstudianteSalud",
actualizar un registro de "EstudianteSalud" existente y eliminar un registro de "EstudianteSalud".
registro. */
class EstudianteSaludController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const RepoGeneral = AppDataSource.getRepository(EstudianteSalud);

          
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
            const RepoGeneral = AppDataSource.getRepository(EstudianteSalud);
            let IdSaludEst, mostrar; 
            IdSaludEst = parseInt(req.params["id"]); 
            if (!IdSaludEst) {
                return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
            }
            
            try {
                mostrar = await RepoGeneral.findOneOrFail({where: {IdSaludEst}, relations: {estudiante: true}}) 
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

        let IdSaludEst;
        try {
            IdSaludEst = parseInt(req.params["id"]);
            if (!IdSaludEst) {
                return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DE LA UBICACIÓN' })
            }

            const EliminarRepo = AppDataSource.getRepository(EstudianteSalud);
      
            let eliminar;
            
            try {
                eliminar = await EliminarRepo.findOne({ where: { IdSaludEst }})
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

export default EstudianteSaludController;