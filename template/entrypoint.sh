#!/bin/sh
set -e
log_dir=/var/log/k8s/$HOSTNAME
mkdir $log_dir && ln -sf $log_dir /med/log
exec "$@"

nginx -g "daemon off;"
