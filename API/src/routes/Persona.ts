import { Router } from "express";
import PersonasController from "../controller/PersonasController";

const routes = Router();

routes.get("", PersonasController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", PersonasController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", PersonasController.add);

routes.patch("/:id", PersonasController.update);

routes.delete("/:id", PersonasController.delete);

export default routes;