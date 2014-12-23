var gulp = require('gulp');
var browserSync = require('browser-sync');

// dev //////////////////////////////////////////////////////////////////////////////////////
gulp.task('browserSync', function() {
  return browserSync.init(null, {
    server: {
      baseDir: 'lessons/'
    }
  });
});

gulp.task('liveReload', function() {
  return browserSync.reload();
});

gulp.task('watch', function() {
  gulp.watch(['lessons/**/*.html', 'lessons/**/*.js'], ['liveReload']);
});

gulp.task('default', ['browserSync', 'watch']);
