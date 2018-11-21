const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('html:build', () => {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('css:build', () => {
  return gulp.src('styles/style.css')
  .pipe(autoprefixer({
    browsers: ['last 16 versions'],
    cascade: false
  }))
    .pipe(gulp.dest('dist/styles'))
});

gulp.task('js:build', () => {
  return browserify('js/main.js')
    .transform('babelify', { presets: ["@babel/preset-env"] })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('img:build', () => {
	return gulp.src('img/**/*.+(jpeg|ico)')
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}]
		}))
		.pipe(gulp.dest('dist/img'))
});

gulp.task('clean', () => {
	return del.sync('dist');
});

gulp.task('build', ['html:build', 'css:build', 'js:build', 'img:build'], () => {});
