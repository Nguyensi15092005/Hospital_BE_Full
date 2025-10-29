import { Router } from "express";
import * as controller from "../../controller/client/user.controller";

const routes: Router = Router();

routes.post("/login", controller.login);

routes.post("/register", controller.register);

routes.post("/password/forgot", controller.forgotPassword);

routes.post("/password/otp", controller.otpPassword);

routes.post("/password/reset", controller.passwordReset);

export default routes



