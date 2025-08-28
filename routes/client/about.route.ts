import { Router } from "express";
import *as controller from "../../controller/client/about.controller";

const routes: Router = Router();

routes.get("/", controller.index);

export default routes;