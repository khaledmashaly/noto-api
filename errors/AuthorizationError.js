import HttpError from './HttpError';

export default class AuthorizationError extends HttpError {
	constructor(msg) {
		super(msg, 401);
	}
}
