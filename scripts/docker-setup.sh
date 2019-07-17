#!/bin/bash

 docker create --name proxy \
	-v /home/mradwan/jack-demo-html/haProxy/config/ha_config.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro \
	-v /home/mradwan/jack-demo-html/haProxy/error/:/etc/haproxy/errors/ \
    -p 80:80 \
    haproxy:1.7

docker run --name app-html \
 	-p 81:80 \
	-v /home/mradwan/jack-demo-html/dist:/usr/share/nginx/html/html \
	-v /home/mradwan/jack-demo-html/theme:/usr/share/nginx/html/html/theme \
	-d nginx

docker run --name app-menu \
 	-p 82:80 \
	-v /home/mradwan/jack-demo-html/menu:/usr/share/nginx/html \
	-d nginx

	sudo certbot certonly --standalone -d majic-student.canadacentral.cloudapp.azure.com \
    --non-interactive --agree-tos --email mohamed.radwan@canada.ca \
    --http-01-port=8888

sudo certbot certonly --standalone --preferred-challenges http --http-01-port 80 -d majic-student.canadacentral.cloudapp.azure.com

docker network connect appnet proxy
docker network connect appnet app-menu
docker network connect appnet app-html