import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Ubicacion } from "../entity/ubicacion";

/* La `clase UbicacionController{` define una clase de controlador para manejar solicitudes
relacionadas con la entidad `Ubicacion`. Contiene métodos estáticos para manejar diferentes
operaciones CRUD, como obtener todas las ubicaciones, obtener una ubicación por ID, agregar una
nueva ubicación, actualizar una ubicación y eliminar una ubicación. Estos métodos se utilizan para
interactuar con la fuente de datos y devolver respuestas apropiadas al cliente. */
class UbicacionController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const UbicacioRepo = AppDataSource.getRepository(Ubicacion);
            const listaUbicacion = await UbicacioRepo.find({
              relations: { estudiantes: true}
            });
            if (listaUbicacion.length == 0) {
              return resp.status(404).json({ mensaje: 'NO SE ENCONTRO RESULTADOS' });
            }
            return resp.status(200).json(listaUbicacion);
          } catch (error) {
            return resp.status(400).json({ mensaje: error });
          }
    }


    static getById = async (req: Request, resp: Response)=>{

        try {
            const RepoUbicaci = AppDataSource.getRepository(Ubicacion);
            let IdUbicacion, mostrarUbicacion; 
            IdUbicacion = parseInt(req.params["id"]); //Busca por medio de la placa
            if (!IdUbicacion) {
                return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
            }
            
            try {
                mostrarUbicacion = await RepoUbicaci.findOneOrFail({where: {IdUbicacion}, relations: {estudiantes:true}}) //Verifica si esta activo
            } catch (error) {
                return resp.status(404).json({mensaje: "NO EXISTE EN LA BASE DE DATOS"})
            } 
            return resp.status(200).json(mostrarUbicacion);
        } catch (error) {
            return resp.status(404).json({mensaje: "HUBO UN ERROR AL PROCESAR LOS DATOS"})
        }
        
    }

    static add = async (req: Request, resp: Response)=>{
        
    }

    static update = async (req: Request, resp: Response)=>{
        
    }

    static delete = async (req: Request, resp: Response)=>{

        let IdUbicacion;
        try {
            IdUbicacion = parseInt(req.params["id"]);
            if (!IdUbicacion) {
                return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DE LA UBICACIÓN' })
            }

            const UbicacionRepo = AppDataSource.getRepository(Ubicacion);
      
            let Ubica;
            
            try {
                Ubica = await UbicacionRepo.findOne({ where: { IdUbicacion }})
            } catch (error) {
                return resp.status(404).json({ mensaje: 'NO SE ENCUENTRA EN LA BASE DE DATOS' })
            }
            try {
                await UbicacionRepo.remove(Ubica)
                return resp.status(200).json({ mensaje: 'SE ELIMINO CORRECTAMENTE' })
            } catch (error) {
                return resp.status(400).json({ mensaje:error})
            }

        } catch (error) {
            return resp.status(404).json({ mensaje: 'NO SE PUDO ELIMINAR' })
        }

        
        
    }

}


export default UbicacionController;