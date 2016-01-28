var request = require('request');
var htmlparser = require("htmlparser2");
var _ = require('underscore');
var fs = require('fs');
var argv = require('optimist').argv;
var outuput = {};
Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};
var parser = new htmlparser.Parser({
  ontext: function(text) {
    text = text.replace(/(\r\n|\n|\r)/gm, "").trim();
    outuput[text] = text;
  }
}, {
  decodeEntities: true
});

function getvalues_hours(num, callback) {
  var url = 'http://planet.openstreetmap.org/replication/day/000/' + num.pad(3) + '/';
  console.log(url);
  request(url, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      parser.write(html);
      parser.end();
      var arr = _.values(outuput);
      arr = arr.filter(function(v) {
        return (v.substr(v.length - 7) === '.osc.gz' || v.substr(v.length - 1) === 'M');
      });
      var result = {};
      for (var i = 0; i < arr.length; i = i + 2) {
        result[arr[i + 1].substring(0, arr[i + 1].length - 12)] = parseInt(num + arr[i].substring(0, arr[i].length - 7));
      }
      callback(result);
    }
  });
}

function getvalues_minutes(num, callback) {
  var url = 'http://planet.openstreetmap.org/replication/hour/000/' + num.pad(3) + '/';
  console.log(url);
  request(url, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      parser.write(html);
      parser.end();
      var arr = _.values(outuput);
      arr = arr.filter(function(v) {
        return (v.substr(v.length - 7) === '.osc.gz' || (v.substr(v.length - 1) === 'M' || v.substr(v.length - 1) === 'K'));
      });
      var result = {};
      for (var i = 0; i < arr.length; i = i + 2) {
        result[arr[i + 1].substring(0, arr[i + 1].length - 9)] = parseInt(num + arr[i].substring(0, arr[i].length - 7));
      }
      callback(result);
    }
  });
}

if (argv.type === 'd') {
  getvalues_hours(argv.num, function(result) {
    fs.writeFile("page-" + argv.num + ".json", JSON.stringify(result), function(err) {});
  });
} else if (argv.type === 'h') {
  getvalues_minutes(argv.num, function(result) {
    fs.writeFile("page-" + argv.num + ".json", JSON.stringify(result), function(err) {});
  });
}