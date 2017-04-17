'use strict';

let conf = require('../lib/config'),
    path = require('path'),
    browserSync = require('browser-sync').create();

exports.browserSync = browserSync;

exports.start = (cb) => {
    let port = conf.config.server.port;
    let startPath = path.join(path.relative(conf.config.src.dir, conf.config.src.html), conf.config.server.startPath);
    startPath = startPath.replace(/\\/g, '/');

    browserSync.init({
        server: {
            baseDir: conf.config.src.dir,
            directory: true
        },
        ui: {
            port: port + 1,
            weinre: {
                port: port + 2
            }
        },
        port: port,
        startPath: startPath,
        online: false,
        logPrefix: 'AxelaServer'
    });
    cb();
};