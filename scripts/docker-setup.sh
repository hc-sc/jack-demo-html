#!/bin/bash

 docker create --name haproxy-open \
    -v /root/haproxy/cfg-file/:/usr/local/etc/haproxy:ro \
	-v /root/haproxy/error/:/etc/haproxy/errors/ \
    -p 80:80 \
	-p 443:443 \
    haproxy:1.7

docker run --name app-html \
 	-p 81:80 \
	-v /home/mradwan/jack-demo-html/dist:/usr/share/nginx/html \
	-v /home/mradwan/jack-demo-html/theme:/usr/share/nginx/html/theme \
	-d nginx

docker run --name app-error \
 	-p 82:80 \
	-d nginx

docker network connect appnet haproxy-open
docker network connect appnet nginx-app