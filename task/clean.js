'use strict';

let gulp = require('gulp'),
    conf = require('../lib/config'),
    cleanFile = require('../plugin/clean-file');

exports.dist = (cb) => {
    gulp.src(conf.config.dist.dir)
        .pipe(cleanFile())
        .pipe(gulp.dest(conf.config.dist.dir))
        .on('end', () => {
            cb();
        });
};