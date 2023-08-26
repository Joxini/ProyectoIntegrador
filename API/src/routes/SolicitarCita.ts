import { Router } from "express";
import SolicitarCitaController from "../controller/SolicitarCitaController";

/* Este código define las rutas para una API REST utilizando el marco Express en TypeScript. */
const routes = Router();

routes.get("", SolicitarCitaController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", SolicitarCitaController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", SolicitarCitaController.add);

routes.patch("/:id", SolicitarCitaController.update);

routes.delete("/:id", SolicitarCitaController.delete);

export default routes;