import { Router } from "express";
import *as controller from "../../controller/client/chuyengiaBacsigioi.controller";

const routes: Router = Router();

routes.get("/", controller.index);
routes.get("/pagi", controller.pagi);

routes.get("/:khoa_id", controller.KhoaId);



export default routes;