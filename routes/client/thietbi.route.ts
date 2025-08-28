import { Router } from "express";
import *as controller from "../../controller/client/thietbi.controller";

const routes: Router = Router();

routes.get("/", controller.index);


export default routes;