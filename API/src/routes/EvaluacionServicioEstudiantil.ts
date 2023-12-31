import { Router } from "express";
import EvaluacionServicioEstudiantilController from "../controller/EvaluacionServicioEstudiantilController";

/* Este código define las rutas para una API REST utilizando el marco Express en TypeScript. */
const routes = Router();

routes.get("", EvaluacionServicioEstudiantilController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", EvaluacionServicioEstudiantilController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", EvaluacionServicioEstudiantilController.add);

routes.patch("/:id", EvaluacionServicioEstudiantilController.update);

routes.delete("/:id", EvaluacionServicioEstudiantilController.delete);

export default routes;