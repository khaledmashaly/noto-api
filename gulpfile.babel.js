import { src, dest, series, parallel } from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import rimraf from 'rimraf';

const paths = {
	src: ['src/**/*.js'],
	tests: ['tests/**/*.js', 'e2e/**/*.js'],
	dest: ['dist/']
};

const clean = (cb) => {
	rimraf('dist', cb);
};

const lint = (files) => {
	return src(files)
		.pipe(eslint())
		.pipe(eslint.format()) // prints eslint output to the console
		.pipe(eslint.failAfterError());
};

const lintSrc = () => lint(paths.src);

const lintTests = () => lint(paths.tests);

const transpile = () => {
	return src(paths.src, { base: 'src' })
		.pipe(babel())
		.pipe(dest(paths.dest));
};

export const lintAll = parallel(lintSrc, lintTests);

export const build = series(clean, lintSrc, transpile);

export default build;
