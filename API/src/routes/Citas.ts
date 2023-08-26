import { Router } from "express";
import CitasController from "../controller/CitasController";

/* Este código define las rutas para una API REST utilizando el marco Express en TypeScript. */
const routes = Router();

routes.get("", CitasController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", CitasController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", CitasController.add);

routes.patch("/:id", CitasController.update);

routes.delete("/:id", CitasController.delete);

export default routes;