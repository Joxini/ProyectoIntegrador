import { Request, Response } from "express";
import { Cuatrimestre } from "../entity/cuatrimestre";
import { AppDataSource } from "../data-source";

class CuatrimestresController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const CuatrimestreRepo = AppDataSource.getRepository(Cuatrimestre);

          
            const listaCuatrimestre = await CuatrimestreRepo.find({ relations: { estudiante: true, carrera: true} });
            if (listaCuatrimestre.length == 0) {
              return resp.status(404).json({ mensaje: 'NO SE ENCONTRO RESULTADOS' });
            }
            return resp.status(200).json(listaCuatrimestre);
          } catch (error) {
            return resp.status(400).json({ mensaje: error });
          }
        
    }


    static getById = async (req: Request, resp: Response)=>{

        try {
            const CuatrimestreRepo = AppDataSource.getRepository(Cuatrimestre);
            let IdEstudiante, mostrar; 
            IdEstudiante = parseInt(req.params["id"]); //Busca por medio de la placa
            if (!IdEstudiante) {
                return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
            }
            
            try {
                mostrar = await CuatrimestreRepo.findOneOrFail({where: {IdEstudiante}, relations: {estudiante: true, carrera: true}}) //Verifica si esta activo
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
            IdEstudiante  = parseInt(req.params["id"]);
            if (!IdEstudiante) {
                return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DE LA UBICACIÓN' })
            }

            const CuatrimestreRepo = AppDataSource.getRepository( Cuatrimestre);
      
            let cuatri;
            
            try {
                cuatri = await CuatrimestreRepo.findOne({ where: { IdEstudiante }})
            } catch (error) {
                return resp.status(404).json({ mensaje: 'NO SE ENCUENTRA EN LA BASE DE DATOS' })
            }
            try {
                await CuatrimestreRepo.remove(cuatri)
                return resp.status(200).json({ mensaje: 'SE ELIMINO CORRECTAMENTE' })
            } catch (error) {
                return resp.status(400).json({ mensaje:error})
            }

        } catch (error) {
            return resp.status(404).json({ mensaje: 'NO SE PUDO ELIMINAR' })
        }
        
    }

}

export default CuatrimestresController;