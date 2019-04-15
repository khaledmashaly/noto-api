import passport from 'passport';

const authController = {
	async login(req, res) {
		const done = async (err, user, info) => {
			if (err) {
				res.status(404).json(err);
				return;
			}

			if (user) {
				try {
					// correct user and password
					const token = await user.generateToken();
					res.status(200).json({ token });
				}
				catch (e) {
					// error in token generation
					res.status(500).json(e);
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
