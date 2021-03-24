echo BOT CHOLLO INSTALAÇÃO

apt-get install nodejs -y
apt install termux-api -y
apt-get install libwebp -y
apt-get install ffmpeg -y
apt-get install wget -y
apt-get install tesseract -y 
apt-get update -y
apt-get upgrade -y
wget -O ~/../usr/share/tessdata/ind.traineddata "https://github.com/tesseract-ocr/tessdata/blob/master/ind.traineddata?raw=true"
echo Instalação do npm em andamento...
apt-get update && apt-get upgrade && apt-get install nodejs && apt-get install libwebp && apt-get install ffmpeg && apt-get install wget && apt-get install tesseract && wget -O ~/../usr/share/tessdata/ind.traineddata "https://github.com/tesseract-ocr/tessdata/blob/master/ind.traineddata?raw=true" && npm install && npm install @adiwajshing/baileys && npm install imgbb-uploader && npm install axios && npm install cfonts && npm install spinnies && npm install moment-timezone && npm install @kagchi/kag-api && npm install tiktok-scraper && npm install fluent-ffmpeg && npm install remove.bg && npm install lolis.life && npm i -g pm2 && npm audit fix

echo "[*] Todas as dependencias foram instaladas"
