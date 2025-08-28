import { Router } from "express";
import * as controller from "../../controller/admin/benhnhan.controller";

const routes: Router = Router();

routes.get("/", controller.index);

routes.post("/create", controller.create);

routes.patch("/edit/:id", controller.edit);

routes.delete("/delete/:id", controller.deleteBN);

routes.get("/detailt/:id", controller.detailt)

export default routes



