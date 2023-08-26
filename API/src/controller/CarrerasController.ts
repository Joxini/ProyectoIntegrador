import { Request, Response } from "express";
import { Carrera } from "../entity/carrera";
import { AppDataSource } from "../data-source";

/* La `clase CarrerasController{` está definiendo una clase TypeScript llamada `CarrerasController`.
Esta clase es responsable de manejar las solicitudes relacionadas con la entidad `Carrera`. Contiene
métodos estáticos para manejar diferentes operaciones CRUD, como recuperar todos los registros de
"Carrera", recuperar un registro de "Carrera" específico por ID, agregar un nuevo registro de
"Carrera", actualizar un registro de "Carrera" existente y eliminar una "Carrera". registro. */
class CarrerasController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const CarreraRepo = AppDataSource.getRepository(Carrera);
            const listaCarrera = await CarreraRepo.find({
              relations: { estudiante: true}
            });
            if (listaCarrera.length == 0) {
              return resp.status(404).json({ mensaje: 'NO SE ENCONTRO RESULTADOS' });
            }
            return resp.status(200).json(listaCarrera);
          } catch (error) {
            return resp.status(400).json({ mensaje: error });
          }
        
    }


    static getById = async (req: Request, resp: Response)=>{

        try {
            const RepoCarrera = AppDataSource.getRepository(Carrera);
            let IdCarrera, mostrar; 
            IdCarrera = parseInt(req.params["id"]); //Busca por medio de la placa
            if (!IdCarrera) {
                return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
            }
            
            try {
                mostrar = await RepoCarrera.findOneOrFail({where: {IdCarrera}, relations: {estudiante:true}}) //Verifica si esta activo
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

        let IdCarrera;
        try {
            IdCarrera = parseInt(req.params["id"]);
            if (!IdCarrera) {
                return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DE LA UBICACIÓN' })
            }

            const CarrerasRepo = AppDataSource.getRepository(Carrera);
      
            let Carreras;
            
            try {
                Carreras = await CarrerasRepo.findOne({ where: { IdCarrera }})
            } catch (error) {
                return resp.status(404).json({ mensaje: 'NO SE ENCUENTRA EN LA BASE DE DATOS' })
            }
            try {
                await CarrerasRepo.remove(Carreras)
                return resp.status(200).json({ mensaje: 'SE ELIMINO CORRECTAMENTE' })
            } catch (error) {
                return resp.status(400).json({ mensaje:error})
            }

        } catch (error) {
            return resp.status(404).json({ mensaje: 'NO SE PUDO ELIMINAR' })
        }
        
    }

}

export default CarrerasController;