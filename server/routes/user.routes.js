import userController from '../controllers/user.controller.js';
import { Router } from 'express';

const router = Router();

router.route("/")
    .post(userController.create);


export default router;