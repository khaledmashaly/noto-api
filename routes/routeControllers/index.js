import { Router } from 'express';
import noteRouteController from './noteRouteController';
import authRouteController from './authRouteController';
import userRouteController from './userRouteController';

const routeControllers = new Router();

routeControllers.use('/note', noteRouteController);
routeControllers.use('/login', authRouteController);
routeControllers.use('/user', userRouteController);

export default routeControllers;
