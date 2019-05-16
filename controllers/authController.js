import passport from 'passport';

const authController = {
	async login(req, res) {
		const done = async (err, user, info) => {
			if (err) {
				res.status(404).json(err);
				return;
			}

			if (user) {
				req.login(user, err => {
					if (err) {
						return res.status(403).json(err);
					}
			}
			else {
				// wrong email and/or password
				res.status(401).json(info);
			}
		};

		passport.authenticate('local', done)(req, res);
	}
};

export default authController;
