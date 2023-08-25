import { Router } from "express";
import EstudianteController from "../controller/EstudianteController";

const routes = Router();

routes.get("", EstudianteController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", EstudianteController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", EstudianteController.add);

routes.patch("/:id", EstudianteController.update);

routes.delete("/:id", EstudianteController.delete);

export default routes;