import { Request, Response } from "express";
import { Cita } from "../entity/cita";
import { AppDataSource } from "../data-source";

class CitasController{

    static getAll = async (req: Request, resp: Response)=>{

        try {
            const CitasRepo = AppDataSource.getRepository(Cita);

          
            const listaCita = await CitasRepo.find({where :{ Estado: true}, relations: { encargado: true, solicitaCita: true} });
            if (listaCita.length == 0) {
              return resp.status(404).json({ mensaje: 'NO SE ENCONTRO RESULTADOS' });
            }
            return resp.status(200).json(listaCita);
          } catch (error) {
            return resp.status(400).json({ mensaje: error });
          }
        
    }


    static getById = async (req: Request, resp: Response)=>{

        try {
            const RepoCitas = AppDataSource.getRepository(Cita);
            let IdCita, mostrar; 
            IdCita = parseInt(req.params["id"]); //Busca por medio de la placa
            if (!IdCita) {
                return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
            }
            
            try {
                mostrar = await RepoCitas.findOneOrFail({where: {IdCita, Estado:true}, relations: {encargado: true, solicitaCita: true}}) //Verifica si esta activo
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

        try {
            let IdCita;
            IdCita = req.params["id"]; //Busca por medio de la placa
            if (!IdCita) {
                return resp.status(400).json({ mensaje: 'Debe indicar el ID que desea eliminar' })
            }

            const ElimiRepo = AppDataSource.getRepository(Cita);
            // Buscamos la vehiculo por su placa
            const EliminarCita = await ElimiRepo.findOne({ where: { IdCita, Estado: true } }); //Se verifica si esta activo para poderlo eliminar por medio de la placa

            // Validamos si la factura existe en la base de datos
            if (!EliminarCita) {
                return resp.status(404).json({ mensaje: 'La marca no existe en la base de datos' });
            }
            //Verifica si se elimina correctamente
            try {
                /* Este bloque de código es responsable de eliminar una marca de la base de datos. */
                EliminarCita.Estado = false;
                await ElimiRepo.save(EliminarCita);//Se elimina
                return resp.status(200).json({ mensaje: 'Se elimino correctamente ' })
            } catch (error) {
                return resp.status(400).json({ mensaje: 'No se pudo eliminar' })
            }

        } catch (error) {
            return resp.status(404).json({ mensaje: 'Ocurrio un problema al momento de eliminar' })
        }
        
    }

}

export default CitasController;