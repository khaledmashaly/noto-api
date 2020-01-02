import { validationResult } from 'express-validator';
import ValidationError from '../errors/ValidationError';

const checkValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new ValidationError('ValidationError', errors.array()));
	}
	next();
};

export default checkValidationErrors;
