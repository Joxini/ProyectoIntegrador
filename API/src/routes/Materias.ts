import { Router } from "express";
import InicioSesionController from "../controller/InicioSesionController";
import MateriasController from "../controller/MateriasController";

/* Este código define las rutas para una aplicación web que utiliza el marco Express en TypeScript. */
const routes = Router();

routes.get("", MateriasController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", MateriasController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", MateriasController.add);

routes.patch("/:id", MateriasController.update);

routes.delete("/:id", MateriasController.delete);

export default routes;