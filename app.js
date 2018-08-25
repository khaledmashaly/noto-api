import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3500;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('<h1>app is working</h1>');
});

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
