#!/bin/bash
# hour
node index.js --num 0 --url $day
node index.js --num 1  --url $day
json-merge page-1.json page-0.json > hour.json
rm page-*
#hour
for i in {1..29}
do
   node index.js --num $i --type 'h'
   sleep 10
done

json-merge  page-29.json page-28.json page-27.json page-26.json page-25.json page-24.json page-23.json page-22.json page-21.json page-20.json page-19.json page-18.json page-17.json page-16.json page-15.json page-14.json page-13.json page-12.json page-11.json page-10.json page-9.json page-8.json page-7.json page-6.json page-5.json page-4.json page-3.json page-2.json page-1.json >hour.json
rm page-*