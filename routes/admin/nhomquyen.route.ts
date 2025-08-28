import { Router } from "express";
import * as controller from "../../controller/admin/nhomquyen.controller";

const routes: Router = Router();

routes.get("/", controller.index);

routes.post("/create", controller.create);

routes.patch("/edit/:id", controller.edit);

routes.delete("/delete/:id", controller.del);

routes.get("/detail/:id", controller.detail);

export default routes



