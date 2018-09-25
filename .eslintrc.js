module.exports = {
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
		'no-tabs': 'off',
		'indent': 'off',
		'quote-props': ['error', 'as-needed'],
		'comma-dangle': 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
		'max-len': 'off',
		'object-curly-spacing': 'off',
		'arrow-parens': 'off'
	}
};
