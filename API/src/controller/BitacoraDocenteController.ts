
import { Request, Response } from "express";
import { BitacoraDocente } from "../entity/bitacoraDocente";
import { AppDataSource } from "../data-source";

/* La `clase BitacoraDocenteController` define una clase de controlador para manejar solicitudes
relacionadas con la entidad `BitacoraDocente`. Contiene métodos estáticos para manejar diferentes
operaciones CRUD, como obtener todos los registros `BitacoraDocente`, obtener un registro
`BitacoraDocente` específico por ID, agregar un nuevo registro `BitacoraDocente`, actualizar un
registro `BitacoraDocente` existente y eliminar un registro `BitacoraDocente` registro. */

class BitacoraDocenteController{
/* El método `getAll` es un método estático de la clase `BitacoraDocenteController`. Se utiliza para
manejar la solicitud HTTP GET para recuperar todos los registros de la entidad `BitacoraDocente`. */

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


    /* El método `static getById` es un método estático de la clase `BitacoraDocenteController`. Se
    utiliza para manejar la solicitud HTTP GET para recuperar un registro `BitacoraDocente`
    específico por su ID. */
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

    /* El método `static delete` es un método estático de la clase `BitacoraDocenteController`. Se
    utiliza para manejar la solicitud HTTP DELETE para eliminar un registro específico
    `BitacoraDocente` por su ID. El método toma los objetos `req` (solicitud) y `resp` (respuesta)
    del marco Express.
    indicando si la eliminación fue exitosa o no. */
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