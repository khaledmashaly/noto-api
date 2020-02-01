import passport from 'passport';
import { Strategy } from 'passport-local';
import { UserModel } from '../models/user-model';

const verifyUser = (username, password, done) => {
	UserModel
		.findOne({ email: username })
		.then((user) => {
			if (!user) {
				done(null, false, { message: 'User not found' });
			}
			else {
				user.checkPassword(password)
					.then((isCorrect) => {
						if (isCorrect) {
							done(null, user);
						}
						else {
							done(null, false, { message: 'wrong password' });
						}
					});
			}
		})
		.catch((err) => done(err));
};

const localStrategy = new Strategy({
	usernameField: 'email',
	passwordField: 'password'
}, verifyUser);

passport.use(localStrategy);

passport.serializeUser((user, done) => {
	done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
	const user = await UserModel.findById(id);
	if (!user) {
		return done(new Error('user not found'));
	}
	return done(null, user);
});
