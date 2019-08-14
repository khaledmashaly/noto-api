import express from 'express';
import noteRouter from './noteRouter';
import authRouter from './authRouter';
import userRouter from './userRouter';

const app = express();

app.use('/note', noteRouter);
app.use('/login', authRouter);
app.use('/user', userRouter);

app.get('*', (req, res) => {
	res.redirect('/');
});

export default app;
