# TLS version of HA Proxy
# Need to provide external mapping file by volume mount
# Need to provide PEM format certificate file by volume mount
FROM haproxy-common
COPY ha-frontend.cfg /usr/local/etc/haproxy/ha-frontend.cfg
COPY certificate.pem /usr/local/etc/haproxy/certificate.pem