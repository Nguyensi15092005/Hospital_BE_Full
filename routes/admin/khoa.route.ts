import { Router } from "express";
import * as controller from "../../controller/admin/khoa.controller";

const routes: Router = Router();

routes.get("/", controller.index);

routes.post("/create", controller.create);

routes.get("/detail/:id", controller.detail);

routes.patch("/edit/:id", controller.edit);

routes.delete("/delete/:id", controller.deleteKhoa);




export default routes;



