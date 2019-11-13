import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';

const MongoStore = connectMongo(session);

const sessionConfig = {
	cookie: {
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	},
	name: 'session-id',
	resave: true,
	secret: process.env.EXPRESS_SESSION_SECRET,
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		secret: 'f326c8d1faacb0fab6711831daf9ef25250af65906e61928afd26ea96fdb2739'
	})
};

export default session(sessionConfig);
