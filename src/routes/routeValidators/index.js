import { Router } from 'express';
import userRouteValidator from './userRouteValidator';

const routeValidators = new Router();

routeValidators.use('/user', userRouteValidator);

export default routeValidators;
