import { Router } from "express";
import * as controller from "../../controller/admin/role.controller";

const routes: Router = Router();

routes.patch("/permission", controller.permission);  

routes.get("/role/:role_id", controller.role);      



export default routes



