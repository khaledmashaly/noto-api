import passport from 'passport';
import { Strategy } from 'passport-local';
import mongoose from 'mongoose';

const User = mongoose.model('User');

const verifyUser = (username, password, done) => {
	User.findOne({ email: username })
		.then(user => {
			if (!user) {
				console.log('passport.verifyUser:', 'user not found');
				done(null, false, { message: 'User not found' });
			}
			else {
				console.log('passport.verifyUser:', 'user found');
				user.checkPassword(password)
					.then((isCorrect) => {
						if (isCorrect) {
							console.log('passport.verifyUser:', 'correct password');
							done(null, user);
						}
						else {
							console.log('passport.verifyUser:', 'wrong password');
							done(null, false, { message: 'wrong password' });
						}
					});
			}
		})
		.catch(err => done(err));
};

const localStrategy = new Strategy({
	usernameField: 'email',
	passwordField: 'password'
}, verifyUser);

passport.use(localStrategy);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	if (!user) {
		return done(new Error('user not found'));
	}
	return done(null, user);
});
