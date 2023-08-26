import { Router } from "express";
import AuthController from "../controller/AuthController";


/* El código crea un objeto enrutador usando la clase `Router` del módulo `express`. */
const routes = Router();

routes.post("/login", AuthController.login);
routes.get("", AuthController.GetAll);



export default routes;