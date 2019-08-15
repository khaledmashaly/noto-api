import HttpError from '../errors/HttpError';
import ValidationError from '../errors/ValidationError';

const errorHandler = (error, req, res, next) => {
	if (error instanceof HttpError) {
		res.status(error.httpStatus);
		if (error instanceof ValidationError) {
			res.json({ errors: error.errors });
		}
		else {
			res.end();
		}
	}
	else {
		next(error);
	}
};

export default errorHandler;
