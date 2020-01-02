import HttpError from '../errors/HttpError';

const errorHandler = (error, req, res, next) => {
	if (error instanceof HttpError) {
		res.status(error.status);
		if (error.hasOwnProperty('errors')) {
			return res.json({ errors: error.errors });
		}
		return res.end();
	}
	else if (error.name === 'MongoError') {
		if (error.code === 11000) {
			return res.status(422).json({ error: 'duplicate key' });
		}
	}
	else if (error.name === 'ValidationError') {
		return res.status(422).json({ errors: error.errors });
	}

	return res.status(500).json(error);
};

export default errorHandler;
