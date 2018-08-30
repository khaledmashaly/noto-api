import express from 'express';
import path from 'path';
import logger from 'morgan';
import noteRouter from './routes/notes';

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/notes', noteRouter);

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
