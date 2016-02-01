#!/bin/bash
rm *.json

n1=$1;
n2=$2;
n3=0;
let n3=n2-n1;
echo $n3

# nohup ./run.sh 1347441960 1348443160 > r0.json 2>&1 &
# nohup ./run.sh 1348443160 1349443160 > r1.json 2>&1 &
# nohup ./run.sh 1349443160 1350443160 > r2.json 2>&1 &
# nohup ./run.sh 1350443160 1351443160 > r3.json 2>&1 &
# nohup ./run.sh 1351443160 1352443160 > r4.json 2>&1 &
# nohup ./run.sh 1352443160 1353443160 > r5.json 2>&1 &
# nohup ./run.sh 1353443160 1354443160 > r6.json 2>&1 &
# nohup ./run.sh 1354443160 1355443160 > r7.json 2>&1 &
# nohup ./run.sh 1355443160 1356443160 > r8.json 2>&1 &
# nohup ./run.sh 1356443160 1357443160 > r9.json 2>&1 &

# When finished up above processes
#sort *.json | uniq >result.json
