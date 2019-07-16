#!/bin/bash

 docker create --name proxy \
	-v /home/mradwan/jack-demo-html/haproxy/cfg
    -v /root/haproxy/cfg-file/:/usr/local/etc/haproxy:ro \
	-v /root/haproxy/error/:/etc/haproxy/errors/ \
	-v /certs:/etc/haproxy/certs:ro \
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

sudo docker run -it --rm \
-v /srv/letsencrypt/etc:/etc/letsencrypt \
-v /srv/letsencrypt/var:/var/lib/letsencrypt \
-p 8888:8888 \
certbot/certbot \
certonly --webroot \
--register-unsafely-without-email --agree-tos \
--webroot-path=/data/letsencrypt \
--staging \
-d majic-student.canadacentral.cloudapp.azure.com -d www.majic-student.canadacentral.cloudapp.azure.com



docker network connect appnet haproxy-open
docker network connect appnet nginx-app
docker network connect appnet nginx-error