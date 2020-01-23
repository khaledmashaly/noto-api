import { Router } from 'express';
import noteRouter from './note-router';
import authRouter from './auth-router';
import userRouter from './user-router';

const routers = new Router();

routers.use('/note', noteRouter);
routers.use('/login', authRouter);
routers.use('/user', userRouter);

export default routers;
