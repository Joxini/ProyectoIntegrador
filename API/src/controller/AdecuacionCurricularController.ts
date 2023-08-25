import { Request, Response } from "express";
import { ApoyoEstudiante } from "../entity/apoyoEstudiante";
import { AppDataSource } from "../data-source";
import { AjusteAcademico } from "../entity/ajusteAcademico";
import { AdecuacionCurricular } from "../entity/adecuacionCurricular";

class AdecuacionCurricularController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const RepoGeneral = AppDataSource.getRepository(AdecuacionCurricular);

          
            const listaGeneral = await RepoGeneral.find({relations:{cuatrimestre: true, saludEst: true, ExpendienteEstudiante: true}});
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
        const RepoGeneral = AppDataSource.getRepository(AdecuacionCurricular);
        let IdAdecuacion, mostrar; 
        IdAdecuacion = parseInt(req.params["id"]); 
        if (!IdAdecuacion) {
            return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
        }
        
        try {
            mostrar = await RepoGeneral.findOneOrFail({where: {IdAdecuacion},relations:{cuatrimestre: true, saludEst: true, ExpendienteEstudiante: true}}) 
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

      let IdAdecuacion;
        try {
            IdAdecuacion = parseInt(req.params["id"]);
            if (!IdAdecuacion) {
                return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DE LA UBICACIÓN' })
            }

            const EliminarRepo = AppDataSource.getRepository(AdecuacionCurricular);
      
            let eliminar;
            
            try {
                eliminar = await EliminarRepo.findOne({ where: { IdAdecuacion }})
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

export default AdecuacionCurricularController;