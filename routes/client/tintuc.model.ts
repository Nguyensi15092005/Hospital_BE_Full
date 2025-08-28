import { Router } from "express";
import *as controller from "../../controller/client/tintuc.controller";

const routes: Router = Router();

routes.get("/", controller.index);
routes.get("/detail/:slug", controller.detail);




export default routes;