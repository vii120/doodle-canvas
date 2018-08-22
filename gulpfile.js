var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify-es').default;

//pug
gulp.task('pug', () => 
  gulp.src('src/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./'))
);

//sass
gulp.task('sass', () => 
  gulp.src('src/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist'))
);

//JS uglify
gulp.task('uglify', () => 
  gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
);

//gulp default
gulp.task('default', ['pug', 'sass', 'uglify']);

//gulp watch
gulp.task('watch', function(){
  gulp.watch('src/*.pug', ['pug']);
  gulp.watch('src/*.sass', ['sass']);
  gulp.watch('src/*.js', ['uglify']);
});

