import { Router } from "express";
import *as controller from "../../controller/client/thechucnang.controller";

const routes: Router = Router();

routes.get("/", controller.index);

export default routes;