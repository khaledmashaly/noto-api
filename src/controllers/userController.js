import UserService from '../services/user-service';
import AddUserDTO from '../dtos/add-user-dto';

const userService = new UserService();

const userController = {
	async create(req, res, next) {
		try {
			const addUserDTO = await AddUserDTO.fromRequestBody(req.body);

			await userService.saveOne(addUserDTO);

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
