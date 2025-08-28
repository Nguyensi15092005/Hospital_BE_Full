import { Router } from "express";
import *as controller from "../../controller/client/contact.controller";

const routes: Router = Router();

routes.post("/create", controller.create);





export default routes;