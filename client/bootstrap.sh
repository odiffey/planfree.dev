#!/bin/bash

if [ "$NODE_ENV" == "development" ]; then
	nginx -c /app/dev.nginx.conf
	cd /app ; npm run serve
else
	cd /app; npm run build
	nginx -c /app/prod.nginx.conf
    tail -f /var/log/nginx/access.log
fi
