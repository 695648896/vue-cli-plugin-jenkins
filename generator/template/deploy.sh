#!/bin/bash

server="harbor.<%= company %>.com"
prefix="formflow"
name=`awk -F'\042' '/\042name\042: \042.+\042/{ print $4; exit; }' package.json`
version=`awk -F'\042' '/\042version\042: \042.+\042/{ print $4; exit; }' package.json`

image="$server/$prefix/$name:$version"
docker build -t $image .

docker push $image
