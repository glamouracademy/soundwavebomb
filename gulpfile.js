var nodemon   = require('nodemon');

var gulp      = require('gulp');
var ee        = require('streamee')

var concat    = require('gulp-concat');
var jade      = require('gulp-jade');
var less      = require('gulp-less');
var uglify    = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');

var paths   = {
  js:     ['src/**/*.js', '!src/**/*.spec.js'],
  style:  ['src/less/style.less'],
  styles: ['src/**/*.less'],
  html:   ['src/index.jade'],
  vendor: {
    js: [

    ]
  },
  dest: 'public'
};

gulp.task('default', ['compile']);

gulp.task('compile', ['js', 'css', 'html']);

gulp.task('watch', ['compile'], function() {
  gulp.watch([paths.js],     ['js']);
  gulp.watch([paths.styles], ['css']);
  gulp.watch([paths.html],   ['html']);
});

gulp.task('js', function() {
  ee.interleave([
    gulp.src(paths.vendor.js),
    gulp.src(paths.js)
  ])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest + '/js'));
});

gulp.task('css', function() {
  gulp.src(paths.style)
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(minifyCSS({ keepSpecialComments: 0 }))
    .pipe(gulp.dest(paths.dest + '/css'));
});

gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(jade())
    .pipe(gulp.dest(paths.dest))
});

gulp.task('server', ['watch'], function() {
  nodemon({
    args:  ['development'],
    script: 'index.js',
    ext:    'js',
    ignore: [
      'src/**'
    ]
  });
});
