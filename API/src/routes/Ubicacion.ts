import { Router } from "express";
import UbicacionController from "../controller/UbicacionController";

/* Este código define las rutas para una API RESTful utilizando el marco Express en TypeScript. */
const routes = Router();

routes.get("", UbicacionController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", UbicacionController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", UbicacionController.add);

routes.patch("/:id", UbicacionController.update);

routes.delete("/:id", UbicacionController.delete);

export default routes;