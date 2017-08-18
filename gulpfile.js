var gulp = require('gulp'),
    concatCss = require('gulp-concat-css');
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    inlinesource = require('gulp-inline-source');

gulp.task('concatcss', function () {
  return gulp.src('CSS/*.css')
    .pipe(concatCss("application.css"))
    .pipe(gulp.dest('css'))
});

gulp.task('minify-css', ["concatcss"], () => {
  return gulp.src('CSS/application.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename("application.min.css"))
    .pipe(gulp.dest('CSS'));
});

gulp.task('inlinesource', ["minify-css"], function () {
    return gulp.src('*.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('./dist'));
});


gulp.task('removeDist', function () {
    return gulp.src(['dist', "CSS/application.css", "CSS/application.min.css"])
        .pipe(clean());
});

gulp.task("build", ["inlinesource"], () => {
  return gulp.src(["CSS/application.min.css", "img/**/*", "JS/app.js"], {base:"./"})
            .pipe(gulp.dest("dist"));
});

gulp.task('default', ["removeDist"], function() {
  gulp.start("build")
});
