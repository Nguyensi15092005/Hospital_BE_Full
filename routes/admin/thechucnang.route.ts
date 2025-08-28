import { Router } from "express";
import * as controller from "../../controller/admin/thechucnang.controller";

const routes: Router = Router();

routes.get("/", controller.index);

routes.post("/create", controller.create);

routes.patch("/update", controller.update);



export default routes



