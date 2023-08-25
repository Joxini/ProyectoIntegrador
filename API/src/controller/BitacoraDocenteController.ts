
import { Request, Response } from "express";
import { BitacoraDocente } from "../entity/bitacoraDocente";
import { AppDataSource } from "../data-source";

class BitacoraDocenteController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const BitacoraRepo = AppDataSource.getRepository(BitacoraDocente);
            const listaBitacora = await BitacoraRepo.find({
              relations: { estudiante: true, profesor: true}
            });
            if (listaBitacora.length == 0) {
              return resp.status(404).json({ mensaje: 'NO SE ENCONTRO RESULTADOS' });
            }
            return resp.status(200).json(listaBitacora);
          } catch (error) {
            return resp.status(400).json({ mensaje: error });
          }
        
    }


    static getById = async (req: Request, resp: Response)=>{

      try {
        const RepoBitacora = AppDataSource.getRepository(BitacoraDocente);
        let IdBitacora, mostrarBitacora; 
        IdBitacora = parseInt(req.params["id"]); 
        if (!IdBitacora) {
            return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
        }
        
        try {
          mostrarBitacora = await RepoBitacora.findOneOrFail({where: {IdBitacora}, relations: { estudiante: true, profesor: true}}) //Verifica si esta activo
        } catch (error) {
            return resp.status(404).json({mensaje: "NO EXISTE EN LA BASE DE DATOS"})
        } 
        return resp.status(200).json(mostrarBitacora);
    } catch (error) {
        return resp.status(404).json({mensaje: "HUBO UN ERROR AL PROCESAR LOS DATOS"})
    }
    
        
    }

    static add = async (req: Request, resp: Response)=>{
        
    }

    static update = async (req: Request, resp: Response)=>{
        
    }

    static delete = async (req: Request, resp: Response)=>{

      let IdBitacora;
      try {
        IdBitacora = parseInt(req.params["id"]);
          if (!IdBitacora) {
              return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DE LA UBICACIÓN' })
          }

          const BitacoraRepo = AppDataSource.getRepository(BitacoraDocente);
    
          let Bitacora;
          
          try {
            Bitacora = await BitacoraRepo.findOne({ where: { IdBitacora }})
          } catch (error) {
              return resp.status(404).json({ mensaje: 'NO SE ENCUENTRA EN LA BASE DE DATOS' })
          }
          try {
              await BitacoraRepo.remove(Bitacora)
              return resp.status(200).json({ mensaje: 'SE ELIMINO CORRECTAMENTE' })
          } catch (error) {
              return resp.status(400).json({ mensaje:error})
          }

      } catch (error) {
          return resp.status(404).json({ mensaje: 'NO SE PUDO ELIMINAR' })
      }

        
    }

}

export default BitacoraDocenteController;