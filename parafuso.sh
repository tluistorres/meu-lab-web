#!/bin/bash
tput civis
trap "tput cnorm; exit" 0 2 3 15
echo -ne "\t\t"
while kill -0 $1 2>&-
do
    for i in \| \/ \- \\ \| \/ \-
    do
        echo -en "\b$i"
        sleep 0.2
    done
done
