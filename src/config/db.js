import mongoose from 'mongoose';

mongoose.connect(process.env.NOTO_DB_URL, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true
});
