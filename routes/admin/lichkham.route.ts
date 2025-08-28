import { Router } from "express";
import *as controller from "../../controller/admin/lichkham.controller";

const routes: Router = Router();

routes.get("/", controller.index);

routes.post("/create", controller.create);

routes.get("/detail/:id", controller.detail);

routes.patch("/edit/:id", controller.edit);

routes.patch("/sendmail", controller.sendmail);

routes.delete("/delete/:id", controller.del);

routes.patch("/change-status/:id/:status", controller.changeStatus);







export default routes;