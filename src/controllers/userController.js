import UserService from '../services/user-service';

const userService = new UserService();

const userController = {
	async create(req, res, next) {
		try {
			const userDTO = {
				email: req.body.email,
				fullname: req.body.fullname,
				password: req.body.password
			};
			await userService.saveOne(userDTO);
			return res.status(201).end();
		}
		catch (error) {
			return next(error);
		}
	},

	async getProfile(req, res, next) {
		try {
			const user = await userService.getOne(req.user.id);
			return res.status(200).json(user);
		}
		catch (error) {
			return next(error);
		}
	}
};

export default userController;
