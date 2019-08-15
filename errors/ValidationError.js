import HttpError from './HttpError';

export default class ValidationError extends HttpError {
	constructor(msg, validationErrors) {
		super(msg, 422);
		this.errors = validationErrors;
	}
}
