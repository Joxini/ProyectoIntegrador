import { Request, Response } from "express";
import { InicioSesion } from "../entity/inicioSesion";
import { AppDataSource } from "../data-source";

/* La `clase InicioSesionController{` define una clase de controlador para manejar solicitudes
relacionadas con la entidad `InicioSesion`. Contiene métodos estáticos para manejar diferentes
solicitudes HTTP, como "getAll" y "add". */
class InicioSesionController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const RepoGeneral = AppDataSource.getRepository(InicioSesion);

          
            const listaGeneral = await RepoGeneral.find();
            if (listaGeneral.length == 0) {
              return resp.status(404).json({ mensaje: 'NO SE ENCONTRO RESULTADOS' });
            }
            return resp.status(200).json(listaGeneral);
          } catch (error) {
            return resp.status(400).json({ mensaje: error });
          }
        
    }


    static add = async (req: Request, resp: Response)=>{
        
    }


}

export default InicioSesionController;