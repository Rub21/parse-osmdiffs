'use strict';
var os = require('os');
var request = require('request');
var path = require('path');
var fs = require('fs');
module.exports = function(minuteStartNumber, done) {
	minuteStartNumber = minuteStartNumber.pad(9);
	var dir1 = minuteStartNumber.toString().substr(0, 3);
	var dir2 = minuteStartNumber.toString().substr(3, 3);
	var file = minuteStartNumber.toString().substr(6, 3);
	var url = 'http://planet.openstreetmap.org/replication/hour/' + dir1 + '/' + dir2 + '/' + file + '.state.txt';
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var v = body.split('\n');
			var obj = {};
			obj.sequenceNumber = parseInt(v[1].split('=')[1]);
			obj.date = v[2].split('=')[1].replace(/[\\\\/]+/g, '');


			obj.timestap = timestamp(obj.date);
			console.log(obj);
			done(obj);
		} else {
			console.log('No file found url:' + url);
			done(false);
		}
	});
};
Number.prototype.pad = function(size) {
	var s = String(this);
	while (s.length < (size || 2)) {
		s = '0' + s;
	}
	return s;
};

function timestamp(date) {
	return (new Date(date)) / 1000;
}