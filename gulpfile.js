"use strict";

var gulp = require("gulp");
var eslint = require("gulp-eslint");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var webserver = require("gulp-webserver");

gulp.task("js", function() {
    return gulp
        .src("builds/sassEssentials/js/myscript.js")
        .pipe(eslint({ configFile: ".eslintrc.json" }))
        .pipe(eslint.format(process.stderr))
});

gulp.task("sass", function() {
    return gulp.src("process/sass/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "compressed", includePaths: ["./node_modules"]}).on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("builds/sassEssentials/css"));
});

gulp.task("watch", function() {
    gulp.watch("builds/sassEssentials/js/**/*", ["js"]);
    gulp.watch(["process/sass/**/*"], ["sass"]);
});

gulp.task("webserver", function() {
    gulp.src("builds/sassEssentials/").pipe(
        webserver({
            livereload: true,
            open: true
        })
    );
});

gulp.task("default", ["sass", "watch", "webserver"]);
