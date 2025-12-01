import { Router } from "express";
import *as controller from "../../controller/client/lichkham.controller";

const routes: Router = Router();


routes.post("/create", controller.create);

routes.get("/user/:userId", controller.getLinhkhamUser);

routes.get("/user-date-now/:userId", controller.getDateNowLichkhamUser); // các cuộc hẹn sắp tới

export default routes;