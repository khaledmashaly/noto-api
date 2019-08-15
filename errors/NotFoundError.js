import HttpError from './HttpError';

export default class NotFoundError extends HttpError {
	constructor(msg) {
		super(msg, 404);
	}
}
