import mongoose from 'mongoose';

const dbUrl = 'mongodb://localhost:27017/noto';

mongoose.connect(dbUrl, { useNewUrlParser: true });

mongoose.connection.on('connection', () => {
	console.log('mongoose connected');
});
mongoose.connection.on('error', (e) => {
	console.log('mongoose connection error:', e);
});
mongoose.connection.on('disconnected', () => {
	console.log('mongoose disconnected');
});

import './models/noteModel';
import './models/userModel';
