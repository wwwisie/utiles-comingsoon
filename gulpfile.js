const sass = require('gulp-sass')(require('sass'));
const gulp = require("gulp");

var postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync").create();

const pa11y = require('pa11y');


// Define tasks after requiring dependencies

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('default', function () {
  gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});

var paths = {
  styles: {
    // By using styles/**/*.scss we're telling gulp to check all folders for any sass file
    src: "scss/**/*.scss",
    // Compiled files will end up in whichever folder it's found in (partials are not compiled)
    dest: "css"
  },
  html: {
    src: '*.html',
  }
};

function style() {
  return (
    gulp
      .src(paths.styles.src)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.styles.dest))
      // Add browsersync stream pipe after compilation
      .pipe(browserSync.stream())
  );
}
exports.style = style;

function reload() {
  browserSync.reload();
}

async function testHTML() {
  const options = {
    standard: 'WCAG2A',
    log: {
      debug: console.log,
      error: console.error,
      info: console.info
    },
    runners: [
      'htmlcs'
    ],
    "reporter": "cli"
  }
  const results = await Promise.all([
    pa11y('http://localhost:3000/', options),
    pa11y('http://localhost:3000/error.html', options)
  ]);

  console.log("\n------------TEST HTML RESULTS------------")
  console.log("\nindex.html", results[0]);
  console.log("\nerror.html", results[1]);
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(paths.styles.src, style);
  gulp.watch("*").on('change', browserSync.reload);
  gulp.watch("*").on('change', testHTML); 
}
exports.watch = watch