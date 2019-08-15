import passport from 'passport';
import AuthenticationError from '../errors/AuthenticationError';

const authController = {
	async login(req, res, next) {
		const authenticationCallback = async (error, user, info) => {
			if (error) return next(new AuthenticationError(error));
			if (!user) return next(new AuthenticationError(info));

			req.login(user, (loginError) => {
				if (loginError) return next(new AuthenticationError(loginError));
				return res.status(200).end();
			});

			return;
		};

		passport.authenticate('local', authenticationCallback)(req, res);
	}
};

export default authController;
