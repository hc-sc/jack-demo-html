# Common version of HA Proxy *Do Not Run Directly, use Open or Secure version*
# Need to provide external mapping file by volume mount
FROM haproxy:1.9.4-alpine
COPY ha-common.cfg /usr/local/etc/haproxy/ha-common.cfg
COPY ha-rules.cfg /usr/local/etc/haproxy/ha-rules.cfg
COPY go-haproxy.sh /
RUN chmod u+x /go-haproxy.sh
CMD ["/go-haproxy.sh"]