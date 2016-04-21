var gulp = require("gulp");
var LiveServer = require("gulp-live-server");
var browserSync = require("browser-sync");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var reactify = require("reactify");

gulp.task("live-server", function() {
	browserSync.init({
        server: {
            baseDir: "./dist"
        },
        port: 8080
    });
});

gulp.task('copyIndex', function() {
	gulp.src('./app/index.html').pipe(gulp.dest('./dist'));
	console.log("Copied index.html");
});

gulp.task('copyHtml', ['copyIndex'], function() {
	gulp.src('.app/**/*.html').pipe(gulp.dest('./dist/html'));
	console.log("Copied all html files");
});


gulp.task("copyCSS", function() {
    gulp.src("./app/**/*.css").pipe(gulp.dest("./dist/css"));
	console.log("Copied all css files");
});

gulp.task('copy', ['copyHtml', 'copyCSS'], function() {
	console.log("Coping files is completed...");
});


gulp.task("bundle", ["copy"], function() {
    return browserify({
        entries: "./app/main.js",
        debug: true
    })
    .transform(reactify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./dist"))
})

gulp.task("serve", ["bundle","live-server"], function() {
	console.log("Server is running...");
});

gulp.task("watch", ["bundle"], browserSync.reload);
gulp.watch("./app/**/*.jsx", ["watch"]);
gulp.watch("./app/**/*.js", ["watch"]);

gulp.watch("./app/**/*.html", ["copyHtml"]);
gulp.watch("./app/**/*.css", ["copyCSS"]);