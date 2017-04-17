'use strict';

const gulp = require('gulp'),
    gutil = require('gulp-util'),
    conf = require('./lib/config'),
    clean = require('./task/clean'),
    css = require('./task/css'),
    server = require('./task/server'),
    watcher = require('./task/watcher'),
    chalk = require('chalk'),
    fs = require('fs'),
    path = require('path'),
    runSequence = require('./lib/run-sequence'),
    lmmf = require('./task/lmmf'),
    compress = require('./task/compress'),
    _ = require('lodash');

exports.run = () => {
    conf.cwd = process.cwd();

    // read config file or use default
    try {
        let conFile = fs.readFileSync(path.resolve(conf.cwd, './axela.json'));
        conf.extend(JSON.parse(String(conFile)));
    } catch (err) {
        gutil.log('Custom config file ' + chalk.magenta('axela.json') + ' not exists,use default config');
    }

    gulp.task('axela:dev', (cb) => {
        gutil.log(chalk.green('♫ ') + 'Starting ' + chalk.cyan('axela') + ' for development...');
        runSequence([css.compile, server.start, watcher.start]).done(() => {
            gutil.log(chalk.green('✔ ') + 'Finished ' + chalk.cyan('axela') + ' for development');
            cb();
        });
    });

    gulp.task('axela:dist', (cb) => {
        gutil.log(chalk.green('♫ ') + 'Starting ' + chalk.cyan('axela') + ' for production...');
        let tasks = [css.compile, clean.dist, lmmf.dist];
        conf.config.compress.js && (tasks.push(compress.js));
        conf.config.compress.css && (tasks.push(compress.css));
        runSequence(tasks).done(() => {
            gutil.log(chalk.green('✔ ') + 'Finished ' + chalk.cyan('axela') + ' for production');
            cb();
        });
    });

    gulp.task('axela:dist2svn', (cb) => {
        runSequence([lmmf.distHtml2Svn, lmmf.distPic2Pic]).done(() => {
            cb();
        });
    });

    if (conf.config.pages) {
        _.each(conf.config.pages, (item) => {
            gulp.task(item.name + ':dev', (cb) => {
                conf.config.server.startPath = item.html;
                runSequence([css.compile, server.start, watcher.start]).done(() => {
                    cb();
                });
            });
            gulp.task(item.name + ':dist', (cb) => {
                conf.config.server.startPath = item.html;
                runSequence([css.compile, clean.dist, lmmf.dist]).done(() => {
                    cb();
                });
            });
        });
    }
};