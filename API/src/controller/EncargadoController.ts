import { Request, Response } from "express";
import { Encargado } from "../entity/encargado";
import { AppDataSource } from "../data-source";

class EncargadoController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const RepoGeneral = AppDataSource.getRepository(Encargado);

          
            const listaGeneral = await RepoGeneral.find({ relations: { persona: true} });
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
            const RepoGeneral = AppDataSource.getRepository(Encargado);
            let IdEncargado, mostrar; 
            IdEncargado = parseInt(req.params["id"]); //Busca por medio de la placa
            if (!IdEncargado) {
                return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
            }
            
            try {
                mostrar = await RepoGeneral.findOneOrFail({where: {IdEncargado}, relations: {persona: true}}) //Verifica si esta activo
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

        let IdEncargado;
        try {
            IdEncargado = parseInt(req.params["id"]);
            if (!IdEncargado) {
                return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DE LA UBICACIÓN' })
            }

            const EliminarRepo = AppDataSource.getRepository(Encargado);
      
            let eliminar;
            
            try {
                eliminar = await EliminarRepo.findOne({ where: { IdEncargado }})
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

export default EncargadoController;