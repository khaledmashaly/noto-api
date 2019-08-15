import { body } from 'express-validator';

const noteValidator = {
	create: [
		body('title')
			.exists({ checkNull: true })
				.withMessage('title is required')
			.not().isEmpty({ ignore_whitespace: true })
				.withMessage('title is required')
			.trim(),

		body('body')
			.trim()
	]
};

export default noteValidator;
