FROM mysql

ENV MYSQL_DATABASE home-work-18

#RUN #chown -R 777 /var/log/mysql
#RUN chown -R mysql.mysql /var/lib/mysql
RUN mkdir -p /var/log/mysql
RUN chown -R mysql.mysql /var/log/mysql
RUN chmod 777 -R /var/log/mysql

COPY ./dump/ /docker-entrypoint-initdb.d/
COPY ./conf/config-file.cnf /etc/my.cnf