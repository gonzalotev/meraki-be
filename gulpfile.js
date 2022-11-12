const {
    dest, parallel, series, src
} = require('gulp');
const $ = require('gulp-load-plugins')();
const gulpEslint = require('gulp-eslint');

const eslint = () => src(['**/*.js', '!node_modules/**', '!dist/**', '!db/**'])
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError());

const server = () => $.nodemon({
    script: './',
    env: {NODE_ENV: process.env.NODE_ENV || 'development'},
    nodeArgs: ['--inspect']
});

const copy = () => src(
    [
        './src/**',
        './db/**',
        './public/**',
        'src/index.js'
    ], {base: '.'}
).pipe(dest('dist'));

const distPackage = () => src('./package.json')
    .pipe($.jsonEditor(json => {
        delete json.devDependencies;
        return json;
    }, {end_with_newline: true}))
    .pipe(dest('dist/'));

const dist = parallel(copy, distPackage);

exports.eslint = eslint;
exports.dev = server;
exports['build-dev'] = series(dist);
exports.build = series(dist);
