var gulp = require('gulp');
var exec = require('child_process').exec;
var colors = require("colors");
gulp.task('default', function() {
  log("=============".blue);
  log("Listing Tasks");
  log("=============".blue);
  log("build:go");
  log("start:go");
  log("=============".blue);
});

// Build the GO backend app
gulp.task('build:go', function() {
  log("Building Go App");
  return new Promise(function(resolve, reject){
    var cmd = 'go build -o ./backend/platforms/go/bin/app ./backend/platforms/go/src/benlorantfy.com/app';
    exec(cmd, function(error, stdout, stderr) {
      log("Done Building Go App");
      resolve();
    });
  })
});

// Start the GO backend app
gulp.task('start:go', function() {
  log("Starting Go App");
  return new Promise(function(resolve, reject){
    var cmd = 'cd ./backend/platforms/go/bin && ./app';
    exec(cmd, function(error, stdout, stderr) {
      console.log(stdout);
      
    });

    log("Started on http://localhost:5000/api/go/v1")
    resolve();
  })
});

function log(message){
  console.log("[INFO]".green + " " + message)
}