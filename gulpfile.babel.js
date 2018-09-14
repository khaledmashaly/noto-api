import {src, dest, series} from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import rimraf from 'rimraf';
import { ncp } from 'ncp';

const paths = {
	styles: {
		src: [],
		dest: []
	},
	scripts: {
		src: ['app.js', 'routes/*.js', 'db/*.js'],
		dest: ['dist/']
	}
};

const srcOptions = { base: '.' };

const clean = (cb) => {
	rimraf('dist', cb);
};

const copyStaticAssets = (cb) => {
	ncp('public', 'dist/public', cb);
};

export const buildJS = () => {
	return src(paths.scripts.src, srcOptions)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
		.pipe(babel())
		.pipe(dest(paths.scripts.dest));
};

const build = series(clean, buildJS, copyStaticAssets);

export default build;
