'use strict';

let gulp = require('gulp'),
    gutil = require('gulp-util'),
    conf = require('../lib/config'),
    css = require('./css'),
    path = require('path'),
    _ = require('lodash'),
    browserSync = require('./server').browserSync;

let changeHandler = function (event) {
    let fileType = _.trimStart(path.extname(event.path), '.');
    let src = event.path;
    let dev = path.dirname(event.path);

    switch (fileType) {
        case 'less':
        case 'scss':
        case 'css':
            css.compileOne(src, dev);
            break;
        default:
            browserSync.reload();
            break;
    }
};

exports.start = (cb) => {
    let watcher = gulp.watch([
            _.trimStart(_.trimStart(conf.config.src.dir, '.'), '/') + '/**/*'
        ]
    );

    watcher
        .on('change', function (event) {
            gutil.log(event.path + ' has been ' + event.type);
            event.type === 'deleted' || changeHandler(event);
        });

    cb();
};