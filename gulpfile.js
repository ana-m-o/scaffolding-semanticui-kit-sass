var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var kit         = require('gulp-kit');
var sass        = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');

// Compile kit into html
gulp.task('kit', function() {
    return gulp.src("src/kit/*.kit")
        .pipe( kit() )
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Scripts (only moves them)
gulp.task('scripts', function() {
    return gulp.src("src/js/**/*")
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

// Statics (only moves them)
gulp.task('statics', function() {
    return gulp.src("statics/**/*")
        .pipe(gulp.dest("dist/statics"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/kit files
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "dist",
            index: "index.html"
        }
    });
    gulp.watch("src/kit/**/*.kit", ['kit']);
    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("src/js/**/*.js", ['scripts']);
    gulp.watch("dist/**/*.html").on('change', browserSync.reload);
});


// Bower dependencies
var vendors = [
    'bootstrap/dist/js',  
    'jquery/dist'
];

//Move bower dependencies from bower_components folder to dist/lib/vendors folder
gulp.task('vendors', function() {
  return merge(vendors.map(function(vendor) {
    return gulp.src('node_modules/' + vendor + '/**/*')
      .pipe(gulp.dest('dist/libs/' + vendor.replace(/\/.*/, '')));
  }));
});


gulp.task('run', ['kit', 'sass', 'scripts', 'statics', 'vendors', 'serve']);