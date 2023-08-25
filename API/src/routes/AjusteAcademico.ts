import { Router } from "express";
import AjusteAcademicoController from "../controller/AjusteAcademico";



const routes = Router();

routes.get("", AjusteAcademicoController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", AjusteAcademicoController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", AjusteAcademicoController.add);

routes.patch("/:id", AjusteAcademicoController.update);

routes.delete("/:id", AjusteAcademicoController.delete);

export default routes;