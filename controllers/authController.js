import passport from 'passport';

const authController = {
	async login(req, res) {
		const done = async (err, user, info) => {
			if (err) {
				return res.status(403).json(err);
			}

			if (user) {
				req.login(user, err => {
					if (err) {
						return res.status(403).json(err);
					}
					return res.status(200).end();
				});
			}
			else {
				return res.status(403).json(info);
			}
		};

		passport.authenticate('local', done)(req, res);
	}
};

export default authController;
