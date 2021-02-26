#!/usr/bin/bash

echo BOT CHOLLO INSTALAÇÃO

apt-get install nodejs -y
apt-get install libwebp -y
apt-get install ffmpeg -y
apt-get install wget -y
apt-get install tesseract -y 
pkg install npm -y
apt-get install npm -y
apt-get update -y
apt-get upgrade -y
clear
wget -O ~/../usr/share/tessdata/ind.traineddata "https://github.com/tesseract-ocr/tessdata/blob/master/ind.traineddata?raw=true"
npm install
npm i -g pm2
clear

echo "[*] All dependencies have been installed, please run the command \"npm start\" to immediately start the script"
