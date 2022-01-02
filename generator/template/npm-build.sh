#!/bin/sh

# 关于set的用法见
# http://www.ruanyifeng.com/blog/2017/11/bash-set.html

# https://registry.npmjs.org/
oldreg=`npm config get registry`
newreg= <%= npmRegistery %>

set -ex;

npm config set strict-ssl false

npm config set registry $newreg

set +e;
#npm install
SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/
npm install
npm run build:docker

set -e;
npm config set registry $oldreg
# npm install --registry=https://registry.npm.taobao.org
# npm install
