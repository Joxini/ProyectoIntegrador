import { Router } from "express";
import ExpedienteEstudianteController from "../controller/ExpedienteEstudianteController";



/* El código define las rutas para una API REST utilizando el marco Express en TypeScript. */
const routes = Router();

routes.get("", ExpedienteEstudianteController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", ExpedienteEstudianteController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", ExpedienteEstudianteController.add);

routes.patch("/:id", ExpedienteEstudianteController.update);

routes.delete("/:id", ExpedienteEstudianteController.delete);

export default routes;
