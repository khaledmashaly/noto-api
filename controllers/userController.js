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
			res.status(201).end();
		}
		catch (err) {
			res.status(500).json(err);
		}
	},
	async getProfile(req, res) {
		if (!req.user) {
			res.status(403).json(new Error('access denied: no logged user'));
		}
		else {
			try {
				const user = await User.findById(req.user.id);
				return res.status(200).json(user);
			}
			catch (err) {
				return res.status(403).json(err);
			}
		}
	}
};

export default userController;
