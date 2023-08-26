import { Router } from "express";
import CuatrimestresController from "../controller/CuatrimestresController";

/* Este código define las rutas para una API RESTful utilizando el marco Express en TypeScript. */
const routes = Router();

routes.get("", CuatrimestresController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", CuatrimestresController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", CuatrimestresController.add);

routes.patch("/:id", CuatrimestresController.update);

routes.delete("/:id", CuatrimestresController.delete);

export default routes;