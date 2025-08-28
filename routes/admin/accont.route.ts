import { Router } from "express";
import * as controller from "../../controller/admin/account.controller";

const routes: Router = Router();

routes.post("/login", controller.login);

export default routes



