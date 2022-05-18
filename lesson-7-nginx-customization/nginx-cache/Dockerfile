FROM openresty/openresty:alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY . /www/data
COPY cache_cleaner.py /www/data

RUN mkdir -p /tmp/nginx_cache
RUN chmod -R 777 /tmp/nginx_cache
RUN apk upgrade --update && apk add --no-cache python3 python3-dev
