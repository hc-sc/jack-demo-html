#!/bin/bash

# create a subnet and add them to the subnet
docker network create \
    --subnet=172.1.0.0/16 \
    appnet

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


#Add to network 

docker network connect appnet proxy
docker network connect appnet app-html
docker network connect appnet SonarQube
docker network connect appnet mysql-server