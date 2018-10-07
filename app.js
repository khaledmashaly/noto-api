import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';

import './config/db';
import './config/passport';

import noteRouter from './routes/noteRouter';
import authRouter from './routes/authRouter';

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/api/notes', noteRouter);
app.use('/auth', authRouter);

app.get('/*', (req, res) => {
	res.redirect('/');
});

app.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json(err);
	}
});

app.listen(port, () => {
	console.log(`app running on port ${port}`);
});
