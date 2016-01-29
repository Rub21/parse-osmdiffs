var fs = require('fs');
var _ = require('underscore');

function timestamp(date) {
  return (new Date(date)) / 1000;
}

var hour = JSON.parse(fs.readFileSync('diffHour.json', 'utf8'));
_.each(hour, function(v, k) {
  var startDateHour = 1347494400;
  var startNumberHour = 1000;
  var intervalHour = 3600;

  var valueTimestamp = timestamp(k);
  valueTimestamp = valueTimestamp - valueTimestamp % 100;

  var diffDate = valueTimestamp - startDateHour;
  console.log(diffDate);
  var number = diffDate / intervalHour;
  console.log(number + '--' + v);
});