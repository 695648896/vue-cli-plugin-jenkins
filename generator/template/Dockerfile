FROM nginx:alpine

LABEL maintainer="<%= author %> <<%= author %>@<%= company %>.com>"
COPY docker-entrypoint.sh /docker-entrypoint.d/
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html
