import { Router } from "express";
import EncargadoController from "../controller/EncargadoController";

/* Este código define las rutas para una aplicación Express.js. */
const routes = Router();

routes.get("", EncargadoController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", EncargadoController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", EncargadoController.add);

routes.patch("/:id", EncargadoController.update);

routes.delete("/:id", EncargadoController.delete);

export default routes;