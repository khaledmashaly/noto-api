import { body } from 'express-validator/check';

const userValidator = {
	create(req, res, next) {
		body('email')
			.exists({ checkNull: true })
				.withMessage('email is required')
			.not().isEmpty({ ignore_whitespace: true })
				.withMessage('email is required')
			.isEmail()
				.withMessage('email is not a valid email address')
			.normalizeEmail();

		body('password')
			.exists({ checkNull: true })
				.withMessage('password is required')
			.not().isEmpty({ ignore_whitespace: true })
				.withMessage('password is required')
			.isLength({ min: 8, max: 20 })
				.withMessage('password must be 8-20 characters long')
			.trim();

		next(req, res);
	}
};

export default userValidator;
