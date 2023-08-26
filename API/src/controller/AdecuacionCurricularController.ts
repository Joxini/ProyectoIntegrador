import { Request, Response } from "express";
import { ApoyoEstudiante } from "../entity/apoyoEstudiante";
import { AppDataSource } from "../data-source";
import { AjusteAcademico } from "../entity/ajusteAcademico";
import { AdecuacionCurricular } from "../entity/adecuacionCurricular";

/* El código define una clase TypeScript llamada `AdecuacionCurricularController`. Esta clase es
responsable de manejar las solicitudes HTTP relacionadas con la entidad `AdecuacionCurricular`.
Contiene métodos para recuperar todos los registros de "AdecuacionCurricular", recuperar un registro
de "AdecuacionCurricular" específico por ID, agregar un nuevo registro de "AdecuacionCurricular",
actualizar un registro de "AdecuacionCurricular" existente y eliminar un registro de
"AdecuacionCurricular". */
class AdecuacionCurricularController{

    /* El método `static getAll` es un método estático de la clase `AdecuacionCurricularController`. Es
    una función asincrónica que maneja la solicitud HTTP GET para recuperar todos los registros de
    la entidad `AdecuacionCurricular`. */
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

        
    


    /* El método `static getById` es un método estático de la clase `AdecuacionCurricularController`.
    Es una función asíncrona que maneja la solicitud HTTP GET para recuperar un registro específico
    de la entidad `AdecuacionCurricular` por su ID. */
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

   /* El método `static delete` es un método estático de la clase `AdecuacionCurricularController`. Es
   una función asincrónica que maneja la solicitud HTTP DELETE para eliminar un registro específico
   de la entidad `AdecuacionCurricular`. */
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