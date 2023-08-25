
import { Request, Response } from "express";
import { BoletaMatricula } from "../entity/boletaMatricula";
import { AppDataSource } from "../data-source";

class BoletaMatriculaController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const BoletaRepo = AppDataSource.getRepository(BoletaMatricula);
            const listaBoleta = await BoletaRepo.find({
              relations: { estudiante: true, recordAcademico: true}
            });
            if (listaBoleta.length == 0) {
              return resp.status(404).json({ mensaje: 'NO SE ENCONTRO RESULTADOS' });
            }
            return resp.status(200).json(listaBoleta);
          } catch (error) {
            return resp.status(400).json({ mensaje: error });
          }
        
    }


    static getById = async (req: Request, resp: Response)=>{

        try {
            const BoletaRepo = AppDataSource.getRepository(BoletaMatricula);
            let boleta, mostrarMatricula; 
            boleta = parseInt(req.params["id"]); //Busca por medio de la placa
            if (!boleta) {
                return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
            }
            
            try {
                mostrarMatricula = await BoletaRepo.findOneOrFail({where: {boleta}, relations: {estudiante: true, recordAcademico: true}}) //Verifica si esta activo
            } catch (error) {
                return resp.status(404).json({mensaje: "NO EXISTE EN LA BASE DE DATOS"})
            } 
            return resp.status(200).json(mostrarMatricula);
        } catch (error) {
            return resp.status(404).json({mensaje: "HUBO UN ERROR AL PROCESAR LOS DATOS"})
        }
        
        
    }

    static add = async (req: Request, resp: Response)=>{
        
    }

    static update = async (req: Request, resp: Response)=>{
        
    }

    static delete = async (req: Request, resp: Response)=>{

        let boleta;
        try {
            boleta = parseInt(req.params["id"]);
            if (!boleta) {
                return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DE LA UBICACIÓN' })
            }

            const BoletaRepo = AppDataSource.getRepository(BoletaMatricula);
      
            let Matri;
            
            try {
                Matri = await BoletaRepo.findOne({ where: { boleta }})
            } catch (error) {
                return resp.status(404).json({ mensaje: 'NO SE ENCUENTRA EN LA BASE DE DATOS' })
            }
            try {
                await BoletaRepo.remove(Matri)
                return resp.status(200).json({ mensaje: 'SE ELIMINO CORRECTAMENTE' })
            } catch (error) {
                return resp.status(400).json({ mensaje:error})
            }

        } catch (error) {
            return resp.status(404).json({ mensaje: 'NO SE PUDO ELIMINAR' })
        }

        
    }

}

export default BoletaMatriculaController;