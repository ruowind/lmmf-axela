'use strict';

const _ = require('lodash');

let cwd = '';

// default config
let config = {
    src: {
        dir: './src',
        html: './src/html',
        pic: './src',
        img: './src/img',
        js: './src/js',
        css: './src/styles',
    },
    dist: {
        dir: './dist',
        html: './dist/html',
        pic: './dist/pic',
        img: './dist/pic/img',
        js: './dist/pic/js',
        css: './dist/pic/styles'
    },
    cdn: {
        domain: ['//pic.lvmama.com'],
        path: '/min/index.php?f='
    },
    server: {
        port: 8080,
        startPath: '/'
    },
    svn: {
        html: 'D:/svn/html',
        pic: 'D:/svn/pic'
    },
    compress: {
        js: false,
        css: false,
        img: false
    },
    pages: []
};

exports.extend = (customConfig) => {
    config = _.extend(config, customConfig);
};

exports.config = config;

exports.cwd = cwd;