import { Router } from "express";
import DatosSostenibilidadEstController from "../controller/DatosSostenibilidadEstController";

const routes = Router();

routes.get("", DatosSostenibilidadEstController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", DatosSostenibilidadEstController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", DatosSostenibilidadEstController.add);

routes.patch("/:id", DatosSostenibilidadEstController.update);

routes.delete("/:id", DatosSostenibilidadEstController.delete);

export default routes;