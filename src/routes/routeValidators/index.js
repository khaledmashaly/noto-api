import { Router } from 'express';
import noteRouteValidator from './noteRouteValidator';
import userRouteValidator from './userRouteValidator';

const routeValidators = new Router();

routeValidators.use('/note', noteRouteValidator);
routeValidators.use('/user', userRouteValidator);

export default routeValidators;
