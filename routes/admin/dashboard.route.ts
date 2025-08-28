import { Router } from "express";
import * as controller from "../../controller/admin/dashboard.controller";

const routes: Router = Router();

routes.get("/", controller.index);

routes.get("/bieu-do", controller.bieudo);

routes.get("/lich-hen", controller.lichhen);

routes.get("/lich-kham-gan-nhat", controller.gannhat)




export default routes



