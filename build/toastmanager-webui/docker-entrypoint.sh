#!/bin/bash

timedatectl set-timezone $TIMEZONE

echo "root:$ROOT_PASSWORD" | chpasswd

sed -i "s/color:.*/color: $SERVER_COLOR/" /etc/ajenti/config.yml
sed -i "s/name:.*/name: $SERVER_NAME/" /etc/ajenti/config.yml
sed -i "s/  port:.*/  port: $SERVER_PORT/" /etc/ajenti/config.yml
sed -i "s/  provider:.*/  provider: tm/" /etc/ajenti/config.yml
sed -i "s/  user_config:.*/  user_config: tm/" /etc/ajenti/config.yml

cat << EOF > /opt/app/config/config.json
{
    "mysql_host": "$MYSQL_HOST",
    "mysql_user": "$MYSQL_USER",
    "mysql_password": "$MYSQL_PASSWORD",
    "mysql_database": "$MYSQL_DATABASE"
}
EOF

if [ $DEV_MODE == 1 ]
then
    echo "Starting in development-mode...!"
    cd /opt/app/plugins
    ajenti-dev-multitool --run-dev
else
    ajenti-panel -d --stock-plugins --plugins /opt/app/plugins -v
    echo "Waiting for ajenti to start..."
    while [ ! -f /var/log/ajenti/ajenti.log ]
    do
        sleep 1
        echo "."
    done
    echo "finished!"
    tail -f /var/log/ajenti/ajenti.log
fi
