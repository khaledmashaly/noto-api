module.exports = {
	env: {
		es6: true,
		node: true
	},
	parserOptions: {
		sourceType: 'module',
	},
	extends: ['eslint:recommended', 'google'],
	rules: {
		'comma-dangle': 0,
		'no-console': process.env.NODE_ENV === 'production' ? 2 : 1,
		'max-len': 0,
		'object-curly-spacing': 0,
		'arrow-parens': 0,
		'no-tabs': 0
	}
};
