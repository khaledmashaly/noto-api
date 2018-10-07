module.exports = {
	root: true,
	env: {
		es6: true,
		node: true
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	extends: [
		'eslint:recommended',
		'google',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	settings: {
		'import/resolver': 'node'
	},
	rules: {
		'arrow-parens': 'off',
		'brace-style': ['error', 'stroustrup'],
		'comma-dangle': 'off',
		'indent': 'off',
		'max-len': 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
		'no-tabs': 'off',
		'object-curly-spacing': ['error', 'always'],
		'one-var': ['error', { 'initialized': 'never', 'uninitialized': 'consecutive' }],
		'quote-props': ['error', 'as-needed'],
		'require-jsdoc': 'off'
	}
};
