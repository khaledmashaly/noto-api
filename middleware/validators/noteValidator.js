import { body } from 'express-validator';

const noteValidator = {
	create: [
		body('title')
			.exists({ checkNull: true })
				.withMessage('title is required')
			.isString()
				.withMessage('title should be a string')
			.not().isEmpty({ ignore_whitespace: true })
				.withMessage('title is required')
			.trim()
			.escape(),

		body('body')
			.optional()
			.isString()
				.withMessage('body should be a string')
			.trim()
			.escape()
	]
};

export default noteValidator;
