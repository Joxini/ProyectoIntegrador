import { Router } from "express";
import AuthController from "../controller/AuthController";


const routes = Router();

routes.post("/login", AuthController.login);
routes.get("", AuthController.GetAll);



export default routes;