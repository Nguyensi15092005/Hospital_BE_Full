import { Router } from "express";
import *as controller from "../../controller/admin/contact.controller";

const routes: Router = Router();

routes.get("/", controller.index);

routes.get("/detail/:id", controller.detail);

routes.delete("/delete/:id", controller.del);

routes.patch("/change-status/:id/:status", controller.changeStatus);

routes.patch("/reqly", controller.reply);




export default routes;