import mongoose from 'mongoose';
const User = mongoose.model('User');

const userController = {
	async create(req, res) {
		try {
			const user = new User({
				email: req.body.email
			});
			await user.setPassword(req.body.password);
			await user.save();
			const token = await user.generateToken();
			res.status(200).json({ token });
		}
		catch (err) {
			res.status(500).json(err);
		}
	},
	async getProfile(req, res) {
		if (!req.payload.id) {
			res.status(401).json({
				message: 'UnauthorizedError: private profile'
			});
		}
		else {
			User.findById(req.payload.id).exec()
				.then(user => {
					res.status(200).json(user);
				})
				.catch(err => res.status(401).json(err));
		}
	}
};

export default userController;
