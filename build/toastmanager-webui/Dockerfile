FROM ubuntu:focal
LABEL Maintainer "Lukas Spitznagel <dev@hermann-toast.de>"

ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update && \
    apt-get install -y software-properties-common curl sudo nano python3-pip && \
    curl https://raw.githubusercontent.com/ajenti/ajenti/master/scripts/install.sh | sudo bash -s - && \
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash - && \
    apt-get install -y nodejs && \
    npm -g install bower babel-cli babel-preset-es2015 babel-plugin-external-helpers less coffee-script angular-gettext-cli angular-gettext-tools && \
    apt-get install -y gettext && \
    pip3 install ajenti-dev-multitool

COPY docker-entrypoint.sh /root/docker-entrypoint.sh
RUN chmod +x /root/docker-entrypoint.sh

ENTRYPOINT [ "/root/docker-entrypoint.sh" ]
