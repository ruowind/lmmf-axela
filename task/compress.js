'use strict';

let gulp = require('gulp'),
    conf = require('../lib/config'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css');

exports.js = (cb) => {
    gulp.src(conf.config.dist.pic + '/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(conf.config.dist.pic))
        .on('end', () => {
            cb();
        });
};

exports.css = (cb) => {
    gulp.src(conf.config.dist.pic + '/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(conf.config.dist.pic))
        .on('end', () => {
            cb();
        });
};