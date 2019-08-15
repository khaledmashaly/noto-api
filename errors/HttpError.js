export default class HttpError extends Error {
	constructor(msg, status = 500) {
		super(msg);
		this.status = status;
		this.time = Date.now();
	}
}
