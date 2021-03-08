#!/usr/bin/bash

echo BOT CHOLLO INSTALAÇÃO

apt-get install nodejs -y
apt install termux-api -y
apt-get install libwebp -y
apt-get install ffmpeg -y
apt-get install wget -y
apt-get install tesseract -y 
apt-get update -y
apt-get upgrade -y
clear
wget -O ~/../usr/share/tessdata/ind.traineddata "https://github.com/tesseract-ocr/tessdata/blob/master/ind.traineddata?raw=true"
clear
echo Instalação do npm em andamento...
npm install
npm install @adiwajshing/baileys
npm -g install ytdl
npm install ytdl-core@latest
npm install shelljs
npm i -g pm2
clear

echo "[*] Todas as dependencias foram instaladas"
