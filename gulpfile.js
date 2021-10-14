const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const twig = require('gulp-twig');

const twigVariables = {
    title: 'Test',
}

const paths = {
    dist: './dist/',
    scss: './src/scss/',
    css: './dist/assets/css/',
    js: './src/js/',
    jsc: './dist/assets/js/',
    twig: './src/templates/',
    misc: [
        `./src/fonts/**/*`,
        `./src/img/**/*`,
        `./src/icons/**/*`,
    ]
};

async function compileCSS() {
    return gulp.src(`${paths.scss}index.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.stream({reload: true}));
}

async function compileJS() {
    return gulp.src(`${paths.js}**/*.js`)
        .pipe(uglify())
        .pipe(gulp.dest(`${paths.jsc}`))
        .pipe(browserSync.stream({reload: true}));
}

async function compileTemplates() {
    console.log("temlates");
    return gulp.src(`${paths.twig}*.twig`)
        .pipe(twig({
            data: twigVariables,
        }))
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.stream({reload: true}));
}

async function compileMisc() {
    paths.misc.forEach((element) => {
        return gulp.src(element)
            .pipe(gulp.dest(`${paths.dist}/${element.split('/')[2]}`))
    })
}


async function serve() {
    browserSync.init({
        server: {
            baseDir: paths.dist
        }
    })
}

async function watch() {
    gulp.watch(`${paths.scss}**/*.scss`, compileCSS);
    gulp.watch(`${paths.js}**/*.js`, compileJS);
    gulp.watch(`${paths.twig}**/*.twig`, compileTemplates);
    gulp.watch(paths.misc, compileMisc);
}

exports.serve = gulp.parallel(watch,
    gulp.series(gulp.parallel(compileJS, compileTemplates, compileCSS, compileMisc)),
        serve);