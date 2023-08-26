import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Persona } from '../entity/persona';
import { InicioSesion } from '../entity/inicioSesion';
import { validate } from 'class-validator';

/* La `clase PersonasController {` define una clase de controlador para manejar solicitudes
relacionadas con la entidad `Persona`. Contiene métodos estáticos para manejar diferentes
operaciones CRUD, como obtener todas las personas, obtener una persona por ID, agregar una nueva
persona, actualizar una persona y eliminar una persona. Estos métodos se utilizan para manejar
solicitudes HTTP e interactuar con la fuente de datos (base de datos) para realizar las operaciones
correspondientes. */
class PersonasController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const personasRepo = AppDataSource.getRepository(Persona);
      const listaPersonas = await personasRepo.find({
        where: { Estado: true }
      });
      if (listaPersonas.length == 0) {
        return resp.status(404).json({ mensaje: 'NO SE ENCONTRO RESULTADOS' });
      }
      return resp.status(200).json(listaPersonas);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static getById = async (req: Request, resp: Response) => {

    try {
      const RepoMarcas = AppDataSource.getRepository(Persona);
      let IdPersona, mostrar; 
      IdPersona = parseInt(req.params["id"]); //Busca por medio de la placa
      if (!IdPersona) {
          return resp.status(404).json({ mensaje: 'NO SE INDICA EL ID' })
      }
      
      try {
          mostrar = await RepoMarcas.findOneOrFail({where: {IdPersona, Estado: true}}) //Verifica si esta activo
      } catch (error) {
          return resp.status(404).json({mensaje: "NO EXISTE EN LA BASE DE DATOS"})
      } 
      return resp.status(200).json(mostrar);
  } catch (error) {
      return resp.status(404).json({mensaje: "HUBO UN ERROR AL PROCESAR LOS DATOS"})
  }

  };

  static add = async (req: Request, resp: Response) => {
   
    try {
      const { IdPersona,Nombre ,apellido1, apellido2, Genero, FechaNacimiento, Rol,Clave } =
        req.body;

      let persona = new Persona();
      persona.Identificacion = IdPersona;
      persona.IdPersona = IdPersona;
      persona.Nombre = Nombre;
      persona.Apellido1 = apellido1;
      persona.Apellido2 = apellido2;
      persona.Genero = Genero;
      persona.FechaNacimiento = FechaNacimiento;
      persona.Estado = true;

      let Inicio = new InicioSesion();
      Inicio.IdPersona = IdPersona;
      Inicio.Rol = Rol;
      Inicio.Clave = Clave;

      // reglas de negocio
      // valiando que el usuario o haya sido creado anteriormente
      const repoPersona = AppDataSource.getRepository(Persona);
      const repoIncio = AppDataSource.getRepository(InicioSesion);
      let PersonaExist = await repoPersona.findOne({
        where: { Identificacion : IdPersona },
      });
      if (PersonaExist) {
        resp.status(400).json({ mensaje: " LA PERSONA YA EXISTE EN LA BASE DE DATOS " });
      }

      // Manda a encriptar la contraseña
      try {
        Inicio.hashPassword();
      } catch (error) {
        resp.status(400).json({ mensaje: " ERROR INESPERADO " });
      }
     

      try {
        await repoPersona.save(persona);
        await repoIncio.save(Inicio);
        return resp.status(201).json({ mensaje: "SE HA CREADO EL USUARIO" });
      } catch (error) {
        resp.status(400).json(error);
      }
    } catch (error) {
      resp.status(400).json({ mensaje: "ERROR DESCONOCIDO" });
    }
  };

  static update = async (req: Request, resp: Response) => {
   
  };
  static delete = async (req: Request, resp: Response) => {

       //Parte de la controladora para eliminar

       try {
        let IdPersona;
        IdPersona = req.params["id"]; //Busca por medio de la placa
        if (!IdPersona) {
            return resp.status(400).json({ mensaje: 'DEBE DE INDICAR EL ID DE LA PERSONA' })
        }

        const ElimiRepo = AppDataSource.getRepository(Persona);
        // Buscamos la vehiculo por su placa
        const EliminarPersona = await ElimiRepo.findOne({ where: { IdPersona, Estado: true } }); //Se verifica si esta activo para poderlo eliminar por medio de la placa

        // Validamos si la factura existe en la base de datos
        if (!EliminarPersona) {
            return resp.status(404).json({ mensaje: 'LA PERSONA NO EXISTE EN LA BASE DE DATOS' });
        }
        //Verifica si se elimina correctamente
        try {
            /* Este bloque de código es responsable de eliminar una marca de la base de datos. */
            EliminarPersona.Estado = false;
            await ElimiRepo.save(EliminarPersona);//Se elimina
            return resp.status(200).json({ mensaje: 'SE ELIMINO CORRECTAMENTE' })
        } catch (error) {
            return resp.status(400).json({ mensaje: 'NO SE PUDO ELIMINAR' })
        }

    } catch (error) {
        return resp.status(404).json({ mensaje: 'OCURRIO UN ERROR AL ELIMINAR' })
    }

    
  };
}

export default PersonasController;
