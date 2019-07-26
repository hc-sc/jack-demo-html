#!/bin/bash

#proxy setup
 docker create --name proxy \
	-v /home/mradwan/proxy/haProxy/config/ha_config.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro \
	-v /home/mradwan/proxy/haProxy/error/:/etc/haproxy/errors/ \
    -p 80:80 \
    haproxy:1.7

#html app
docker run --name app-html \
 	-p 81:80 \
	-v /home/mradwan/html/dist:/usr/share/nginx/html/html \
	-v /home/mradwan/html/theme:/usr/share/nginx/html/html/theme \
	-d nginx

#html menu
docker run --name app-menu \
 	-p 82:80 \
	-v /home/mradwan/menu:/usr/share/nginx/html \
	-d nginx

#php with apache
docker run --name app-php \
	-p 83:80  \
	-v /home/mradwan/php/src:/var/www/html/php \
	-v /home/mradwan/php/theme:/var/www/html/php/theme \
	-d php:7.2-apache
	


#java tom cat


docker run -it --rm --name app -v "$PWD":/usr/src/myapp -p 83:80 -w /usr/src/myapp php:7.2-cli

certbot certonly --standalone --http-01-port 80 -d majic-student.canadacentral.cloudapp.azure.com

#mysql

docker run -d --name mysql-server \
	-p 3306:3306 \
	-e MYSQL_ROOT_PASSWORD=sonarqube123 \
	-e MYSQL_DATABASE=sonar \
	mysql/mysql-server

#sonarqube instance

docker run -d --name SonarQube --link mysql-server:mysql-server -p 9000:9000 -p 9092:9092 \
	-v /home/bbhowmik/sonar/conf/sonar.properties:/opt/sonarqube/conf/sonar.properties \
	sonarqube:7.4-community

# create a subnet and add them to the subnet
docker network create \
    --subnet=172.1.0.0/16 \
    appnet


docker network connect appnet proxy
docker network connect appnet app-menu
docker network connect appnet app-html
docker network connect appnet app-php
docker network connect appnet SonarQube
docker network connect appnet mysql-server
