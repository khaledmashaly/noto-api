import HttpError from '../errors/HttpError';

export default (err, req, res, next) => {
	if (err instanceof HttpError) {
		res.status(err.httpStatus).end();
	}
	else {
		next(err);
	}
};
