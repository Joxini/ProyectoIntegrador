import { Router } from "express";
import ApoyoEstudianteController from "../controller/ApoyoEstudianteController";


const routes = Router();

routes.get("", ApoyoEstudianteController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", ApoyoEstudianteController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", ApoyoEstudianteController.add);

routes.patch("/:id", ApoyoEstudianteController.update);

routes.delete("/:id", ApoyoEstudianteController.delete);

export default routes;