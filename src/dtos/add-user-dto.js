import Joi from '@hapi/joi';
import ValidationError from '../errors/ValidationError';

export default class AddUserDTO {
	constructor(email, fullname, password, confirmPassword) {
		this.email = email;
		this.fullname = fullname;
		this.password = password;
		this.confirmPassword = confirmPassword;
	}

	static get schema() {
		return Joi.object({
			email: Joi.string().required().email().lowercase(),
			fullname: Joi.string().required().max(255),
			password: Joi.string().required().min(8).max(20).strict(),
			confirmPassword: Joi.string().required().valid(Joi.ref('password')).strict()
		});
	}

	static async fromRequestBody(requestBody) {
		try {
			await this.schema.validateAsync(requestBody);
			return new AddUserDTO(
				requestBody.email,
				requestBody.fullname,
				requestBody.password,
				requestBody.confirmPassword
			);
		}
		catch (validationError) {
			throw new ValidationError('user error', validationError.details);
		}
	}
}
