import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { DatosSostenibilidadEstudiante } from "../entity/datosSostenibilidadEstudiante";

/* La clase DatosSostenibilidadEstController` es una clase de controlador que maneja las solicitudes
HTTP relacionadas con la entidad `DatosSostenibilidadEstudiante`. Contiene métodos para manejar
diversas operaciones CRUD, como recuperar todos los datos, recuperar datos por ID, agregar datos,
actualizar datos y eliminar datos. Estos métodos se utilizan para interactuar con el repositorio
`DatosSostenibilidadEstudiante` y realizar las operaciones correspondientes sobre la base de datos. */
class DatosSostenibilidadEstController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const DatosRepo = AppDataSource.getRepository(DatosSostenibilidadEstudiante);

          
            const listaDatos = await DatosRepo.find({ relations: { estudiante: true}});
            if (listaDatos.length == 0) {
              return resp.status(404).json({ mensaje: 'NO SE ENCONTRO RESULTADOS' });
            }
            return resp.status(200).json(listaDatos);
          } catch (error) {
            return resp.status(400).json({ mensaje: error });
          }
        
    }


    static getById = async (req: Request, resp: Response)=>{

        try {
            const DatosRepo = AppDataSource.getRepository(DatosSostenibilidadEstudiante);
            let IdSostenibilidad, mostrar; 
            IdSostenibilidad = parseInt(req.params["id"]); //Busca por medio de la placa
            if (!IdSostenibilidad) {
                return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
            }
            
            try {
                mostrar = await DatosRepo.findOneOrFail({where: {IdSostenibilidad}, relations: {estudiante: true}}) //Verifica si esta activo
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

        let IdSostenibilidad;
        try {
            IdSostenibilidad  = parseInt(req.params["id"]);
            if (!IdSostenibilidad) {
                return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DE LA UBICACIÓN' })
            }

            const SostenibilidadtreRepo = AppDataSource.getRepository( DatosSostenibilidadEstudiante);
      
            let Soste;
            
            try {
                Soste = await SostenibilidadtreRepo.findOne({ where: { IdSostenibilidad }})
            } catch (error) {
                return resp.status(404).json({ mensaje: 'NO SE ENCUENTRA EN LA BASE DE DATOS' })
            }
            try {
                await SostenibilidadtreRepo.remove(Soste)
                return resp.status(200).json({ mensaje: 'SE ELIMINO CORRECTAMENTE' })
            } catch (error) {
                return resp.status(400).json({ mensaje:error})
            }

        } catch (error) {
            return resp.status(404).json({ mensaje: 'NO SE PUDO ELIMINAR' })
        }
        
    }

}

export default DatosSostenibilidadEstController;