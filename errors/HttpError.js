export default class HttpError extends Error {
	constructor(msg, status) {
		super(msg);
		this.httpStatus = status || 500;
	}
}
