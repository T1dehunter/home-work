FROM nginx
COPY default.conf /etc/nginx/conf.d/default.conf
COPY . /www/data
COPY js /www/data
COPY img /www/data
RUN chmod -R 777 /tmp