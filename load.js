'use strict';
var argv = require('optimist').argv;
var download = require('./src/download');
var fs = require('fs');

var result = [];
//inicio
function init() {
  download(minuteStartNumber, save);
}

function save(obj) {
  if (obj) {
    result.push(obj);
    minuteStartNumber++;
    init();
  } else {

    fs.writeFile("diffHours.json", JSON.stringify(result), function(err) {});
  }
}
var minuteStartNumber = 1000;
init();