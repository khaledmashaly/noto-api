import gulp from 'gulp';
import eslint from 'gulp-eslint';

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

export const scripts = () => {
  gulp.src(paths.scripts.src)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
};

gulp.task('build', scripts);

export default scripts;
