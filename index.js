'use strict';
var argv = require('optimist').argv;
var fetch = require('./src/fetch');
var fs = require('fs');
var result = [];
var opts = {
  m: {
    num: 1,
    url: 'http://planet.openstreetmap.org/replication/minute/'
  },
  h: {
    num: 1000,
    url: 'http://planet.openstreetmap.org/replication/hour/'
  },
  d: {
    num: 1,
    url: 'http://planet.openstreetmap.org/replication/day/'

  }
};

function init() {
  console.log('num :' + number);
  fetch(number, opts[argv.type].url, save);
}

function save(obj) {
  if (obj) {
    result.push(obj);
    number++;
    init();
  } else {
    fs.writeFile('diff-' + argv.type + '.json', JSON.stringify(result), function(err) {});
  }
}
var number = opts[argv.type].num;
init();