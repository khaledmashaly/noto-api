import { Router } from 'express';
import userController from '../controllers/userController';

const authRouter = new Router();

authRouter.route('/').post(userController.create);
authRouter.route('/profile').get(userController.getProfile);

export default authRouter;
