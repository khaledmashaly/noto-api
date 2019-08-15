import HttpError from './HttpError';

export default class AuthenticationError extends HttpError {
	constructor(msg) {
		super(msg, 403);
	}
}
