# Script to launch HA Proxy in open or secure mode

# Concatinates config files before launching HA Proxy
rm -f /usr/local/etc/haproxy/haproxy.cfg
cat /usr/local/etc/haproxy/ha-common.cfg /usr/local/etc/haproxy/ha-frontend.cfg /usr/local/etc/haproxy/ha-rules.cfg  /usr/local/etc/haproxy/ha-mapping.cfg > /usr/local/etc/haproxy/haproxy.cfg

# Set parameters
set -e
set -- haproxy -W -db -f /usr/local/etc/haproxy/haproxy.cfg

# Launch HA Proxy
exec "$@"