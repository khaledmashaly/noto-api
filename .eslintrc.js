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
		'brace-style': ['error', 'stroustrup'],
		'comma-dangle': ['error', 'never'],
		'indent': ['error', 'tab'],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'max-len': 'off',
		'no-console': 'error',
		'no-tabs': 'off',
		'object-curly-spacing': ['error', 'always'],
		'one-var': ['error', { 'initialized': 'never', 'uninitialized': 'consecutive' }],
		'quote-props': ['error', 'as-needed'],
		'require-jsdoc': 'off'
	}
};
