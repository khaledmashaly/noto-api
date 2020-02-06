import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';

import './config/passport';
import session from './config/sessionConfig';
import authenticationMiddleware from './middleware/authenticationMiddleware';
import errorHandler from './middleware/errorHandler';
import routers from './routers';

const app = express();

app.use(cors({
	origin: true,
	credentials: true
}));
app.use(helmet());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use(authenticationMiddleware);
app.use(routers);
app.use(errorHandler);

export { app };
