import sessionController from "../controllers/session.controller.js";
import { authenticate } from "../config/middleware.config.js";
import { Router } from 'express';

const router = Router();

router.route("/")
    .post(sessionController.login)
    .get(authenticate, sessionController.getLoggedUser)
    .delete(authenticate, sessionController.logout);

export default router;