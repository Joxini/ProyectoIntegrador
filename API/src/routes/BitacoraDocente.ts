import { Router } from "express";
import BitacoraDocenteController from "../controller/BitacoraDocenteController";



/* Este código define las rutas para una API RESTful utilizando el marco Express en TypeScript. */
const routes = Router();

routes.get("", BitacoraDocenteController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", BitacoraDocenteController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", BitacoraDocenteController.add);

routes.patch("/:id", BitacoraDocenteController.update);

routes.delete("/:id", BitacoraDocenteController.delete);

export default routes;