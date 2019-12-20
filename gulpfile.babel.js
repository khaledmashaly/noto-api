import { src, dest, series } from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import rimraf from 'rimraf';

const paths = {
	src: [
		'app.js',
		'config/**/*.js',
		'controllers/**/*.js',
		'errors/**/*.js',
		'middleware/**/*.js',
		'models/**/*.js',
		'routes/**/*.js'
	],
	dest: ['dist/']
};

const srcOptions = { base: '.' };

const clean = (cb) => {
	rimraf('dist', cb);
};

export const buildJS = () => {
	return src(paths.src, srcOptions)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
		.pipe(babel())
		.pipe(dest(paths.dest));
};

const build = series(clean, buildJS);

export default build;
