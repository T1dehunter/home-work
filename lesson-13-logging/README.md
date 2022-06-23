## Description

App for testing elk and graylog setups.

## install

```bash
cd elk-setup/app or graylog-setup/app

$ npm install
```

## add data

```bash
cd elk-setup/app or graylog-setup/app

$ node initData.js
```

## run test

```bash
cd elk-setup or graylog-setup
clear && docker-compose up --build
cd elk-setup/app or graylog-setup/app

# run search requests for set data to mysql slow query log
$ node searchData.js
```

## Results

## ELK SETUP

<p align="center" xmlns="http://www.w3.org/1999/html">
  <img alt="test" src="./results/elk-setup/screen_1.png" />
</p>

<p align="center" xmlns="http://www.w3.org/1999/html">
  <img alt="test" src="./results/elk-setup/screen_2.png" />
</p>

<p align="center" xmlns="http://www.w3.org/1999/html">
  <img alt="test" src="./results/elk-setup/screen_3.png" />
</p>

## GRAYLOG SETUP

<p align="center" xmlns="http://www.w3.org/1999/html">
  <img alt="test" src="./results/graylog-setup/screen_1.png" />
</p>

<p align="center" xmlns="http://www.w3.org/1999/html">
  <img alt="test" src="./results/graylog-setup/screen_2.png" />
</p>

<p align="center" xmlns="http://www.w3.org/1999/html">
  <img alt="test" src="./results/graylog-setup/screen_3.png" />
</p>