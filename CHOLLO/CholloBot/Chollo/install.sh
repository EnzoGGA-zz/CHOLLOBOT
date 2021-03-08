#!/usr/bin/bash

clear
echo BOT CHOLLO INSTALAÇÃO
apt install nodejs
apt install termux-api
apt install libwebp
apt install ffmpeg
apt install wget
apt install tesseract
apt update
apt upgrade
wget -O ~/../usr/share/tessdata/ind.traineddata "https://github.com/tesseract-ocr/tessdata/blob/master/ind.traineddata?raw=true"
echo Instalação do npm em andamento...
npm install
npm install @adiwajshing/baileys
npm -g install ytdl
npm install shelljs
npm i -g pm2
clear

echo "[*] Todas as dependencias foram instaladas"
