#!/usr/bin/bash

clear
echo BOT CHOLLO INSTALAÇÃO
apt install nodejs -y
apt install termux-api -y
apt install libwebp -y
apt install ffmpeg -y
apt install wget -y
apt install tesseract -y
apt update -y
apt upgrade -y
wget -O ~/../usr/share/tessdata/ind.traineddata "https://github.com/tesseract-ocr/tessdata/blob/master/ind.traineddata?raw=true"
echo Instalação do npm em andamento...
npm install
npm -g install ytdl
npm install shelljs
npm i -g pm2
clear

echo "[*] Todas as dependencias foram instaladas"
