import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import noteRouter from './routes/notes';

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/notes', noteRouter);

app.get('*', (req, res) => {
	res.redirect('/');
});

app.listen(port, () => {
	console.log(`app running on port ${port}`);
});
