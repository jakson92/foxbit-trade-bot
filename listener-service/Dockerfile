FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y wget
RUN apt-get -y install curl

# rethinkdb installation
RUN echo "deb http://download.rethinkdb.com/apt xenial main" | tee /etc/apt/sources.list.d/rethinkdb.list
RUN wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | apt-key add -
RUN apt-get update
RUN apt-get install -y rethinkdb
RUN rm -rf /var/lib/apt/lists/

# nodeJS installation
RUN #! /bin/bash curl -sL https://deb.nodesource.com/setup_8.x | -E bash -
RUN apt-get update
RUN apt-get install -y nodejs

VOLUME ["/data"]

WORKDIR /data

CMD ["rethinkdb", "--bind", "all"]

EXPOSE 8080