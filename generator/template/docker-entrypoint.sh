#!/bin/bash
set -e
export ENV_APP_BASE_API=${ENV_APP_BASE_API:-}




cd /usr/share/nginx/html
for filename in `ls -a`
do
  if [[ $filename =~ \.js$ ]] ; then
   echo $filename
   envsubst "$(printf '${%s} ' ${!ENV*})" < $filename> $filename.tmp
   mv $filename.tmp $filename
  fi
done
cd /usr/share/nginx/html
envsubst "$(printf '${%s} ' ${!ENV*})" < index.html > index.html.tmp
mv index.html.tmp index.html
exit 0
