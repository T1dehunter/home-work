FROM ubuntu:16.04
MAINTAINER Emilio Coppa <ercoppa@gmail.com>

RUN apt-get update && apt-get install -y sudo nano git build-essential automake && rm -rf /var/lib/apt/lists/*

RUN apt-get update
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash
RUN apt-get install --yes nodejs

RUN useradd -m ubuntu && \
    echo ubuntu:ubuntu | chpasswd && \
    cp /etc/sudoers /etc/sudoers.bak && \
    echo 'ubuntu  ALL=(root) NOPASSWD: ALL' >> /etc/sudoers
USER ubuntu
WORKDIR /home/ubuntu

RUN git clone https://github.com/ercoppa/aprof
RUN cd aprof/valgrind/ && ./build.sh \
COPY ./quick_tutorial.c /home/ubuntu

