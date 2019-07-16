#!/bin/bash

 docker create --name proxy \
	-v /home/mradwan/jack-demo-html/haProxy/config/ha_config.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro \
	-v /home/mradwan/jack-demo-html/haProxy/error/:/etc/haproxy/errors/ \
	-v /certs:/etc/haproxy/certs:ro \
    -p 80:80 \
	-p 443:443 \
    haproxy:1.7

docker run --name app-htm \
 	-p 81:80 \
	-v /home/mradwan/jack-demo-html/dist:/usr/share/nginx/html/html \
	-v /home/mradwan/jack-demo-html/theme:/usr/share/nginx/html/html/theme \
	-d nginx

docker run --name app-menu \
 	-p 82:80 \
	-v /home/mradwan/jack-demo-html/menu:/usr/share/nginx/html \
	-d nginx
#ssl
sudo docker run -it --rm \
-v /docker-volumes/etc/letsencrypt:/etc/letsencrypt \
-v /docker-volumes/var/lib/letsencrypt:/var/lib/letsencrypt \
-v /docker/letsencrypt-docker-nginx/src/letsencrypt/letsencrypt-site:/data/letsencrypt \
-v "/docker-volumes/var/log/letsencrypt:/var/log/letsencrypt" \
certbot/certbot \
certonly --webroot \
--register-unsafely-without-email --agree-tos \
--webroot-path=/data/letsencrypt \
--staging \
-d majic-student.canadacentral.cloudapp.azure.com


docker network connect appnet haproxy-open
docker network connect appnet nginx-app
docker network connect appnet nginx-error