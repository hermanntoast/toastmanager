#!/bin/bash

echo "$ROOT_PASSWORD:$ROOT_PASSWORD" | chpasswd
ajenti-panel -d --plugins /root/app/plugins -v
tail -f /var/log/ajenti/ajenti.log
