import session from 'express-session';
import mongoStore from 'connect-mongodb-session';

const Sessionstore = mongoStore(session);
const store = new Sessionstore(
	{
		uri: process.env.NOTO_DB_URL,
		collection: process.env.NOTO_SESSION_COLLECTION
	},
	(error) => {
		if (error) {
			console.error('Sessionstore error:', error);
		}
	}
);

store.on('error', (error) => {
	console.error('Sessionstore error event:', error);
});

const sessionConfig = {
	cookie: {
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	},
	name: 'session-id',
	resave: true,
	saveUninitialized: true,
	secret: process.env.EXPRESS_SESSION_SECRET,
	store
};

export default session(sessionConfig);
