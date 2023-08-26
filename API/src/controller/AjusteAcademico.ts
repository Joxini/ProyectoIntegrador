import { Request, Response } from "express";
import { ApoyoEstudiante } from "../entity/apoyoEstudiante";
import { AppDataSource } from "../data-source";
import { AjusteAcademico } from "../entity/ajusteAcademico";

/* El código define una clase llamada `AjusteAcademicoController` que es responsable de manejar las
solicitudes relacionadas con la entidad `AjusteAcademico`. Contiene métodos estáticos para manejar
diferentes métodos HTTP como `getAll`, `getById`, `add`, `update` y `delete`. Estos métodos se
utilizan para realizar operaciones CRUD en la entidad `AjusteAcademico`. */
class AjusteAcademicoController{

    /* El método `static getAll` es un método estático de la clase `AjusteAcademicoController`. Se
    utiliza para manejar la solicitud HTTP GET para recuperar todas las instancias de la entidad
    "AjusteAcademico". */
    static getAll = async (req: Request, resp: Response)=>{

        try {
            const RepoGeneral = AppDataSource.getRepository(AjusteAcademico);

          
            const listaGeneral = await RepoGeneral.find();
            if (listaGeneral.length == 0) {
              return resp.status(404).json({ mensaje: 'NO SE ENCONTRO RESULTADOS' });
            }
            return resp.status(200).json(listaGeneral);
          } catch (error) {
            return resp.status(400).json({ mensaje: error });
          }
       
    }

        
    


    /* El método `static getById` es un método estático de la clase `AjusteAcademicoController`. Se
    utiliza para manejar la solicitud HTTP GET para recuperar una instancia específica de la entidad
    `AjusteAcademico`. */
    static getById = async (req: Request, resp: Response)=>{

      try {
        const RepoGeneral = AppDataSource.getRepository(AjusteAcademico);
        let DeclaracionJurada, mostrar; 
        DeclaracionJurada = parseInt(req.params["id"]); 
        if (!DeclaracionJurada) {
            return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
        }
        
        try {
            mostrar = await RepoGeneral.findOneOrFail({where: {DeclaracionJurada}}) 
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

      let DeclaracionJurada;
        try {
            DeclaracionJurada = parseInt(req.params["id"]);
            if (!DeclaracionJurada) {
                return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DE LA UBICACIÓN' })
            }

            const EliminarRepo = AppDataSource.getRepository(AjusteAcademico);
      
            let eliminar;
            
            try {
                eliminar = await EliminarRepo.findOne({ where: { DeclaracionJurada }})
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

export default AjusteAcademicoController;