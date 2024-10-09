const gulp = require('gulp')
const del = require('del')
const zip = require('gulp-zip')

gulp.task('clear_zip', () => {
  return del('dist.zip')
})

gulp.task('build_zip', gulp.parallel('clear_zip', () => {
  return gulp.src([
    'dist/**'
  ]).pipe(zip('dist.zip'))
    .pipe(gulp.dest('./'))
}))
