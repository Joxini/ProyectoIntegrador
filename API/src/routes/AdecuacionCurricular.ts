import { Router } from "express";
import AdecuacionCurricularController from "../controller/AdecuacionCurricularController";



const routes = Router();

routes.get("", AdecuacionCurricularController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", AdecuacionCurricularController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", AdecuacionCurricularController.add);

routes.patch("/:id", AdecuacionCurricularController.update);

routes.delete("/:id", AdecuacionCurricularController.delete);

export default routes;