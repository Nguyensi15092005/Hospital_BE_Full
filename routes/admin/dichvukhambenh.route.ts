import { Router } from "express";
import * as controller from "../../controller/admin/dichvukhambenh.controller";

const routes: Router = Router();

routes.get("/", controller.index);

routes.post("/create", controller.create);

routes.patch("/edit/:id", controller.edit);

routes.delete("/delete/:id", controller.deleted);

routes.get("/detail/:id", controller.detail);

export default routes



