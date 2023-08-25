import { Router } from "express";

import CarrerasController from "../controller/CarrerasController";

const routes = Router();

routes.get("", CarrerasController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", CarrerasController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", CarrerasController.add);

routes.patch("/:id", CarrerasController.update);

routes.delete("/:id", CarrerasController.delete);

export default routes;