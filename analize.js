var fs = require('fs');
var _ = require('underscore');

function date2timestamp(date) {
  return (new Date(date)) / 1000;
}
var dates = JSON.parse(fs.readFileSync('diff-h.json', 'utf8'));
var startDate = 1351033200;
var startNumber = 1000;
var interval = 3600;
var broken;
for (var i = 0; i < dates.length; i++) {
  var d = dates[i];
  var timestamp = date2timestamp(d.date);
  timestamp = timestamp - timestamp % 100;
  var diffDate = timestamp - startDate;
  var supposeNumber = (diffDate/interval) + startNumber;
  console.log(supposeNumber + '---' + parseInt(supposeNumber) + '---' + d.sequenceNumber);
  //broken = d.date;
  // if (supposeNumber !== d.sequenceNumber) {
  //   console.log(d.date);
  // }
}