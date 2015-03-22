var gulp = require('gulp');
var browserSync = require('browser-sync');

// dev //////////////////////////////////////////////////////////////////////////////////////
gulp.task('browserSync', function() {
  return browserSync.init(null, {
    server: {
      baseDir: ['lessons/', 'works/']
    }
  });
});

gulp.task('liveReload', function() {
  return browserSync.reload();
});

gulp.task('watch', function() {
  gulp.watch(['**/*.html', '**/*.js'], ['liveReload']);
});

gulp.task('default', ['browserSync', 'watch']);
