#!/bin/bash

 docker create --name proxy \
	-v /home/mradwan/proxy/haProxy/config/ha_config.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro \
	-v /home/mradwan/proxy/haProxy/error/:/etc/haproxy/errors/ \
    -p 80:80 \
    haproxy:1.7

docker run --name app-html \
 	-p 81:80 \
	-v /home/mradwan/html/dist:/usr/share/nginx/html/html \
	-v /home/mradwan/html/theme:/usr/share/nginx/html/html/theme \
	-d nginx

docker run --name app-menu \
 	-p 82:80 \
	-v /home/mradwan/menu:/usr/share/nginx/html \
	-d nginx


docker run -it --rm --name my-running-script -v "$PWD":/usr/src/myapp -w /usr/src/myapp php:7.2-cli php your-script.php


certbot certonly --standalone --http-01-port 80 -d majic-student.canadacentral.cloudapp.azure.com

# create a subnet and add them to the subnet
docker network create \
    --subnet=172.1.0.0/16 \
    appnet


docker network connect appnet proxy
docker network connect appnet app-menu
docker network connect appnet app-html