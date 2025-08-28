import { Router } from "express";
import *as controller from "../../controller/client/setting.controller";

const routes: Router = Router();

routes.get("/", controller.index);

export default routes;