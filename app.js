import 'dotenv/config';
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import './config/db';
import './config/passport';
import routes from './routes';
import session from './config/sessionConfig';

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.use((err, req, res) => {
	console.error(err);
	if (err.name === 'UnauthorizedError') {
		res.status(401).json(err);
	}
	else {
		res.sendStatus(500);
	}
});

app.listen(port, () => {
	console.log(`app running on port ${port}`);
});
