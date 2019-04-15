import { Router } from 'express';
import auth from '../config/jwt';
import userController from '../controllers/userController';

const authRouter = new Router();

authRouter.route('/').post(userController.create);
authRouter.route('/profile').get(auth, userController.getProfile);

export default authRouter;
