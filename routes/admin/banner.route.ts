import { Router } from "express";
import * as controller from "../../controller/admin/banner.controller";

const routes: Router = Router();

routes.get("/", controller.index);

routes.post("/create", controller.create);

routes.get("/detail/:id", controller.detail);

routes.patch("/edit/:id", controller.edit);

routes.delete("/delete/:id", controller.del);




export default routes




