import mongoose from 'mongoose';

mongoose.connect(
	process.env.NOTO_DB_URL,
	{
		useNewUrlParser: true,
		useFindAndModify: false
	}
);

mongoose.connection.on('connection', () => {
	console.log('mongoose connected');
});
mongoose.connection.on('error', (e) => {
	console.log('mongoose connection error:', e);
});
mongoose.connection.on('disconnected', () => {
	console.log('mongoose disconnected');
});

import '../models/noteModel';
import '../models/userModel';
