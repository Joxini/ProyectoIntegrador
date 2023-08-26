import { Request, Response } from "express";
import { RecordAcademico } from "../entity/recordAcademicoEstudiantil";
import { AppDataSource } from "../data-source";

/* La clase `RecordAcademicoEstController` es una clase de controlador que maneja las operaciones CRUD
para la entidad `RecordAcademico` en una aplicación Express. Contiene métodos estáticos para manejar
solicitudes HTTP, como obtener todos los registros, obtener un registro por ID, agregar un nuevo
registro, actualizar un registro y eliminar un registro. */
class RecordAcademicoEstController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const RepoGeneral = AppDataSource.getRepository(RecordAcademico);

          
            const listaGeneral = await RepoGeneral.find({relations:{boletaMatri: true, estudiante:true}});
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
            const RepoGeneral = AppDataSource.getRepository(RecordAcademico);
            let IdEstudiante, mostrar; 
            IdEstudiante = parseInt(req.params["id"]); 
            if (!IdEstudiante) {
                return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
            }
            
            try {
                mostrar = await RepoGeneral.findOneOrFail({where: {IdEstudiante}, relations:{boletaMatri: true, estudiante:true}}) 
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

        let IdEstudiante;
        try {
            IdEstudiante = parseInt(req.params["id"]);
            if (!IdEstudiante) {
                return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DE LA UBICACIÓN' })
            }

            const EliminarRepo = AppDataSource.getRepository(RecordAcademico);
      
            let eliminar;
            
            try {
                eliminar = await EliminarRepo.findOne({ where: { IdEstudiante }})
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

export default RecordAcademicoEstController;