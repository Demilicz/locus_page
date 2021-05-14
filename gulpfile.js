const project_folder = "dist";
const project_source = "src";


const path = {
  build: {
    html: project_folder + "/",
    css : project_folder + "/css/",
    js : project_folder + "/js/",
    images : project_folder + "/images/",
    fonts : project_folder + "/fonts/",
    icons : project_folder + "/css/fonts/"
  },
  src: {
    html: [project_source + "/*.html","!" + project_source+"/_*.html" ],
    css : project_source + "/css/style.scss",
    js : project_source + "/js/app.js",
    images : project_source + "/images/**/*.+(png|jpg|gif|ico|svg|webp)",
    fonts : project_source + "/css/fonts/*.+(woff|woff2|svg|ttf|eot)",
    icons : project_source + "/images/svg/fonts/*.+(woff|svg|ttf)"
  },

  watch: {
    html: project_source + "/**/*.html",
    css : project_source + "/css/**/*.+(scss|css)",
    js : project_source + "/js/**/*.js",
    images : project_source + "/images/**/*.+(png|jpg|gif|ico|svg|webp|css|js)",
    icons : project_source + "/images/svg/*.+(woff|svg|ttf)"
  },
  clean: "./"+ project_folder + "/"
};

const {src, dest} = require("gulp"),
      gulp = require("gulp"),
      browsersync = require("browser-sync").create(),
      fileinclude = require("gulp-file-include"),
      del = require("del"),
      scss = require("gulp-sass"),
      autoPrefixer = require("gulp-autoprefixer"),
      groupMedia = require("gulp-group-css-media-queries"),
      cleanCss = require("gulp-clean-css"),
      rename = require("gulp-rename"),
      uglify = require("gulp-uglify-es").default,
      babel = require("gulp-babel"),
      webp = require("gulp-webp"),
      webpHtml = require("gulp-webp-html"),
      webpCss = require("gulp-webpcss"),
      svgSprite = require("gulp-svg-sprite");



function uploadBrowser() {
  browsersync.init({

    server: {
      baseDir:"./"+ project_folder + "/"
    },
    port: 3000,
    notify: false

  })
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(webpHtml())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {

  return src(path.src.css)

  .pipe(
    scss({
      outputStyle: "expanded"
    })
  )
  .pipe(groupMedia())
  .pipe(
    autoPrefixer({
      overrideBrowserslist: ['last 5 versions'] ,
      cascade: true
  }))
  .pipe(webpCss({webpClass: '.webp',noWebpClass: '.no-webp'}))
  .pipe(dest(path.build.css))
  .pipe(cleanCss())
  .pipe( rename({extname: ".min.css"}))
  .pipe(dest(path.build.css))
  .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(babel({
        presets: ['@babel/env']
      }))
    .pipe( uglify())
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function fonts() {
  src(path.src.fonts)
  .pipe(dest(path.build.fonts))
}

function imagesFunction() {
  return src(path.src.images)
    .pipe(
      webp({
        quality: 70
      })
    )
    .pipe(dest(path.build.images))
    .pipe(src(path.src.images))
    .pipe(dest(path.build.images))
    .pipe(browsersync.stream())
}

function icons() {
  src(path.src.icons)
  .pipe(dest(path.build.icons))
}

function wacthFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.images], imagesFunction);
  gulp.watch([path.watch.icons], icons);
}

function cleanDist() {
  return del(path.clean);
}



gulp.task('svgSprite',  () => {
  return gulp.src([project_source + '/images/SVG/*.svg'])
  .pipe(svgSprite({
    mode:{
      stack: {
        sprite: "../icons.svg",
        example: true
      }
    }
  }))
  .pipe(dest(path.build.images))
})



const build = gulp.series(cleanDist, gulp.parallel(js, css, html, imagesFunction, fonts, icons));
const watch = gulp.parallel(build, wacthFiles, uploadBrowser);



exports.icons = icons;
exports.fonts = fonts;
exports.imagesFunction = imagesFunction;
exports.js  = js;
exports.css  = css;
exports.html  = html;
exports.watch = watch;
exports.default = watch;
exports.build  = build;







