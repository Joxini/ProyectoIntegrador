import { Router } from "express";
import RecordAcademicoEstController from "../controller/RecordAcademicoEstController";

/* Este código define las rutas para una API REST utilizando el marco Express en TypeScript. */
const routes = Router();

routes.get("", RecordAcademicoEstController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/:id", RecordAcademicoEstController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", RecordAcademicoEstController.add);

routes.patch("/:id", RecordAcademicoEstController.update);

routes.delete("/:id", RecordAcademicoEstController.delete);

export default routes;