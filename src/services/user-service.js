import { UserModel } from '../models/user-model';
import NotFoundError from '../errors/NotFoundError';

export default class UserService {
	constructor() {
		this.UserModel = UserModel;
	}

	async saveOne(userDTO) {
		const newUser = new this.UserModel({
			email: userDTO.email,
			fullname: userDTO.fullname
		});
		await newUser.setPassword(userDTO.password);
		return newUser.save();
	}

	async getOne(userId) {
		const user = await this.UserModel.findOne({ _id: userId }, { password: 0 });
		if (!user) {
			throw new NotFoundError('user not found');
		}
		return user;
	}

	getMany(userId) {
	}

	async updateOne(updatedNote, noteId) {
	}

	deleteOne(noteId) {
	}
}
