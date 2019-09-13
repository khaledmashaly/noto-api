import 'dotenv/config';
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import './config/db';
import './config/passport';
import session from './config/sessionConfig';
import authenticationMiddleware from './middleware/authenticationMiddleware';
import routeValidators from './routes/routeValidators';
import checkValidationErrors from './middleware/checkValidationErrors';
import routeControllers from './routes/routeControllers';
import errorHandler from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || '3000';

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use(authenticationMiddleware);
app.use(routeValidators);
app.use(checkValidationErrors);
app.use(routeControllers);
app.use(errorHandler);

app.listen(port, () => console.log(`app running on port ${port}`));
