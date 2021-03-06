var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('build', function () {
    return gulp.src('lib/qqMap.js')
        .pipe(rename({basename: 'index'}))
        .pipe(gulp.dest(''));
});

gulp.task('uglify', function () {
    return gulp.src('lib/qqMap.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('lib/'));
});