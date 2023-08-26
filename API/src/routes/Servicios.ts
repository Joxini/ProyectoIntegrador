import { Router } from "express";
import ServiciosController from "../controller/ServiciosController";

/* Este código define las rutas para una API RESTful utilizando el marco Express en TypeScript. */
const routes = Router();

routes.get("", ServiciosController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", ServiciosController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", ServiciosController.add);

routes.patch("/:id", ServiciosController.update);

routes.delete("/:id", ServiciosController.delete);

export default routes;