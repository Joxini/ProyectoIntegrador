import { Router } from "express";
import ProfesoresController from "../controller/ProfesoresController";

/* Este código define las rutas para una API REST utilizando el marco Express en TypeScript. */
const routes = Router();

routes.get("", ProfesoresController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", ProfesoresController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", ProfesoresController.add);

routes.patch("/:id", ProfesoresController.update);

routes.delete("/:id", ProfesoresController.delete);

export default routes;