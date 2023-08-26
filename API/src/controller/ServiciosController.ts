import { Request, Response } from "express";
import { Servicios } from "../entity/servicio";
import { AppDataSource } from "../data-source";

/* La `clase ServiciosController{` está definiendo una clase TypeScript llamada `ServiciosController`.
Esta clase es responsable de manejar las solicitudes relacionadas con la entidad `Servicios`.
Contiene métodos estáticos para manejar diferentes operaciones CRUD, como recuperar todos los
"Servicios", recuperar un "Servicio" específico por ID, agregar un nuevo "Servicio", actualizar un
"Servicio" existente y eliminar un "Servicio". */
class ServiciosController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const RepoGeneral = AppDataSource.getRepository(Servicios);

          
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
            const RepoGeneral = AppDataSource.getRepository(Servicios);
            let IdServicio, mostrar; 
            IdServicio = parseInt(req.params["id"]); 
            if (!IdServicio) {
                return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
            }
            
            try {
                mostrar = await RepoGeneral.findOneOrFail({where: {IdServicio}}) 
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

    static delete = async (req: Request, resp: Response)=>{ //No se puede eliminar porque tiene relación con otra

        let IdServicio;
        try {
            IdServicio = parseInt(req.params["id"]);
            if (!IdServicio) {
                return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DE LA UBICACIÓN' })
            }

            const EliminarRepo = AppDataSource.getRepository(Servicios);
      
            let eliminar;
            
            try {
                eliminar = await EliminarRepo.findOne({ where: { IdServicio }})
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

export default ServiciosController;