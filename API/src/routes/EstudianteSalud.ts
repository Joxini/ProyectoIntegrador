import { Router } from "express";
import EstudianteSaludController from "../controller/EstudianteSaludController";

const routes = Router();

routes.get("", EstudianteSaludController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", EstudianteSaludController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", EstudianteSaludController.add);

routes.patch("/:id", EstudianteSaludController.update);

routes.delete("/:id", EstudianteSaludController.delete);

export default routes;