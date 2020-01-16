import Joi from '@hapi/joi';
import ValidationError from '../errors/ValidationError';

export default class AddNoteDTO {
	constructor(title, body) {
		this.title = title;
		this.body = body;
	}

	static get schema() {
		return Joi.object({
			title: Joi.string().required().trim(),
			body: Joi.string().optional().allow('')
		});
	}

	static async fromRequestBody(requestBody) {
		try {
			await this.schema.validateAsync(requestBody);
			return new AddNoteDTO(requestBody.title, requestBody.body);
		}
		catch (validationError) {
			throw new ValidationError('note error', validationError.details);
		}
	}
}
