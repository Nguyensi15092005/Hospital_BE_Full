import { Router } from "express";
import *as controller from "../../controller/client/lichkham.controller";

const routes: Router = Router();


routes.post("/create", controller.create);

routes.get("/user/:token", controller.getLinhkhamUser);

routes.get("/user-date-now/:userId", controller.getDateNowLichkhamUser); // các cuộc hẹn sắp tới

routes.delete("/huy-lich-kham/:lichKhamId", controller.DelLichKham)

export default routes;