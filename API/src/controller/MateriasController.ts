import { Request, Response } from "express";
import { Materias } from "../entity/materia";
import { AppDataSource } from "../data-source";

/* La `clase MateriasController{` define una clase de TypeScript llamada `MateriasController`. Esta
clase es responsable de manejar las solicitudes relacionadas con la entidad "Materias". Contiene
métodos estáticos para manejar diferentes operaciones CRUD, como recuperar todos los "Materias",
recuperar una "Materia" específica por ID, agregar una nueva "Materia", actualizar una "Materia"
existente y eliminar una "Materia". */
class MateriasController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const RepoGeneral = AppDataSource.getRepository(Materias);

          
            const listaGeneral = await RepoGeneral.find();
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
            const RepoGeneral = AppDataSource.getRepository(Materias);
            let IdMateria, mostrar; 
            IdMateria = parseInt(req.params["id"]); 
            if (!IdMateria) {
                return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
            }
            
            try {
                mostrar = await RepoGeneral.findOneOrFail({where: {IdMateria}}) 
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

    static delete = async (req: Request, resp: Response)=>{ //No se puede eliminar tiene esta relacionada con otra

        let IdMateria;
        try {
            IdMateria = parseInt(req.params["id"]);
            if (!IdMateria) {
                return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DE LA UBICACIÓN' })
            }

            const EliminarRepo = AppDataSource.getRepository(Materias);
      
            let eliminar;
            
            try {
                eliminar = await EliminarRepo.findOne({ where: { IdMateria }})
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

export default MateriasController;