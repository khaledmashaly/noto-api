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

	const errorResponse = {
		error: 'server error'
	};

	if (process.env.NODE_ENV === 'development') {
		errorResponse.error = {
			name: error.name,
			message: error.message,
			fileName: error.fileName,
			lineNumber: error.lineNumber,
			columnNumber: error.columnNumber,
			stack: error.stack
		};
	}

	return res.status(500).json(errorResponse);
};

export default errorHandler;
