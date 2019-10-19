import User from '../models/userModel';
import NotFoundError from '../errors/NotFoundError';

const userController = {
	async create(req, res, next) {
		try {
			const user = new User({
				email: req.body.email,
				fullname: req.body.fullname
			});
			await user.setPassword(req.body.password);
			await user.save();
			return res.status(201).end();
		}
		catch (error) {
			return next(error);
		}
	},

	async getProfile(req, res, next) {
		try {
			const user = await User.findById(
				req.user.id,
				{
					password: 0,
					__v: 0
				}
			);
			if (!user) {
				return next(new NotFoundError('user not found'));
			}
			return res.status(200).json(user);
		}
		catch (error) {
			return next(error);
		}
	}
};

export default userController;
