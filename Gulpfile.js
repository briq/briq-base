// Requires
// —————————————————————————————————
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    confirm = require('gulp-confirm'),
    fs = require('fs'),
    jshint = require('gulp-jshint'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    prompt = require('gulp-prompt'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    svgmin = require('gulp-svgmin'),
    uglify = require('gulp-uglify');


// Functions
// —————————————————————————————————
function customPlumber(errTitle, errSound) {
  return plumber({
    errorHandler: notify.onError({
      title: errTitle || 'projectName',
      subtitle: '<%= error.file.relative %>',
      message: 'Line <%= error.line %>: <%= error.message %>',
      sound: errSound || 'Beep'
    })
  });
}


// Development
// —————————————————————————————————
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './',
      port: 4000
    },
    notify: false,
    //files: ['**/*.*'],
    open: false,
    reloadDelay: 500
  })
})

gulp.task('sass', function() {
  gulp.src('assets/sass/main.scss')
    .pipe(customPlumber('Error running sass', 'Funk'))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'))
    .pipe(notify({
      title: 'Houston',
      message: 'CSS all good.',
    }))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('javascript', function() {
  gulp.src('assets/js/**/*.js')
    .pipe(customPlumber('Error running javascript'))
    .pipe(jshint({laxcomma: true, asi: true}))
    .pipe(jshint.reporter())
    .pipe(concat('public.js'))
    .pipe(notify({
      title: 'Houston',
      message: 'Javascript all good.',
    }))
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('default', ['browserSync', 'sass', 'javascript'], function() {
  gulp.watch('assets/sass/**/*.scss', ['sass']);
  gulp.watch('assets/js/*.js', ['javascript']);
  gulp.watch('**/*.html', browserSync.reload);
});


// Production
// —————————————————————————————————
gulp.task('build', function() {
  runSequence(
    'build-sass',
    'build-svg',
    'build-javascript'
  );
});

gulp.task('build-sass', function() {
  gulp.src('assets/sass/_index.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css'))
});

gulp.task('build-svg', function () {
  gulp.src('public/img/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('public/img/'))
});

gulp.task('build-javascript', function() {
  gulp.src('assets/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
});
