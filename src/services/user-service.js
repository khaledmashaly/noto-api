import { User } from '../models/userModel';
import NotFoundError from '../errors/NotFoundError';

export default class UserService {
	constructor() {
		this.userModel = User;
	}

	async saveOne(userDTO) {
		const newUser = new this.userModel({
			email: userDTO.email,
			fullname: userDTO.fullname
		});
		await newUser.setPassword(userDTO.password);
		return newUser.save();
	}

	async getOne(userId) {
		const user = await this.userModel.findOne({ _id: userId }, { password: 0 });
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
