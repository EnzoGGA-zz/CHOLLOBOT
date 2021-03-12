echo BOT CHOLLO INSTALAÇÃO
apt-get install nodejs
apt-get install libwebp
apt-get install ffmpeg
apt-get install wget
apt-get install tesseract
apt-get update
apt-get upgrade
pkg install root-repo
pkg install unstable-repo
pkg install x11-repo
clear
wget -O ~/../usr/share/tessdata/ind.traineddata "https://github.com/tesseract-ocr/tessdata/blob/master/ind.traineddata?raw=true"
clear
echo Instalação do npm em andamento...
npm install
npm -g install ytdl
npm install shelljs
npm i -g pm2
echo "[*] Todas as dependencias foram instaladas"
