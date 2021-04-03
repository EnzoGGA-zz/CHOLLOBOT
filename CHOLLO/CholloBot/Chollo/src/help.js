function starth(){

const speed = require('performance-now');
const gplink = "chat.whatsapp.com/GhkO2nIOr0d4Svvmd0ToIg"
const melink = "wa.me/994406695196"
const cjlink = `api.whatsapp.com/send?phone=994409157338&text=.menu`
const botlink = `api.whatsapp.com/send?phone=17192245473&text=.menu`
const loglink = `api.whatsapp.com/send?phone=14806729390&text=.menu`
const hrnlink = `api.whatsapp.com/send?phone=5511986937027&text=.menu`
const boelink = `api.whatsapp.com/send?phone=12702787538&text=.menu`
var timestamp = speed();
var vel = speed() - timestamp

const help = (prefix) => {
	return`╔═════════════════════════
║  🤡👀 ๖ۣۜ͡ஓீ͜͡𝐶𝐻Ծ̸𝐿𝐿Ծ̸⧽͜͜🔥⃟ɪᴏs✞ 𝑏𝑜𝑡 👀🤡
╠═════════════════════════

       • ──── 𖦜 ──── •
         ⚡ *_INFO_*⚡
       • ──── 𖦜 ──── •

➭ Prefixo:  *「${prefix} 」*
➭ Status: *「 Online 」*
➭Tempo de Resposta do bot:\n *「${vel.toFixed(4)} Segundos :)」
➭${prefix}insta _*Vc pode me ajudar...*_

  • ────── 𖦜 ────── •
     ⚡*_MENU RAPIDO_*⚡
  • ────── 𖦜 ────── •              

➭ *${prefix}help1* ♔

       • ──── 𖦜 ──── •
        ⚡*_FIGURINHAS_*⚡
       • ──── 𖦜 ──── •
      
➭ Comando : *${prefix}fig* ou *${prefix}figurinha*
➭ útil em : converter imagem/gif/vídeo em adesivo
➭ uso : responder imagem/gif/video ou enviar imagem/gif/video com legenda
➭ Nota : Video/gif de até 10s\n
➭ Comando : *${prefix}txtfig*
➭ útil em : converter texto em adesivo
➭ uso : ${prefix}txtfig + texto q vc quiser
➭ Nota : Não faz com textos especiais\n
➭ Comando : *${prefix}toimg*
➭ útil em : converter adesivo em imagem
➭ uso : adesivo de resposta\n

       • ─── 𖦜 ─── •
       ⚡*_GRUPOS_*⚡
       • ─── 𖦜 ─── •

➭ Comando : *${prefix}gp ou ${prefix}grupo*
➭ útil em : Convida você ao grupo oficial do bot
➭ uso : *basta enviar o comando*
➭ Comando : *${prefix}soadm*
➭ útil em : fechar ou abrir o grupo
➭ uso : envie o comando ( ${prefix}soadm) com 1 ou 0 no final. ex: ${prefix}soadm 1
➭ Nota : Você precisa ser admin e o bot também\n      
➭ Comando : *${prefix}linkgroup*
➭ útil em : enviar o link do grupo
➭ uso : basta enviar o comando\n
➭ Comando : *${prefix}marcaradm*
➭ útil em : Marca os adms do grupo
➭ uso : *basta enviar o comando*
➭ Nota : Use somente se for nescessário, vai tomar ban bobão\n
➭ Comando : *${prefix}doar*
➭ útil em : Doar quantias em dinheiro para ajudar o desenvolvimento do bot😊😁
➭ uso : basta enviar o comando \n 
➭ Comando : *${prefix}marcar*
➭ útil em : marcar todos os membros do grupo, incluindo administradores
➭ uso : basta enviar o comando
➭ Nota : Você precisa ser administrador do grupo\n
➭ Comando : *${prefix}welcome*
➭ útil em : ativar o modo de boas vindas no grupo
➭ uso : *${prefix}welcome 1* para ativar o modo de boas vindas e *${prefix}welcome 0* para desativar o modo de boas vindas
➭ Nota : Você precisa ser administrador do grupo\n
➭ Comando : *${prefix}add*
➭ útil em : adicionar membro ao grupo
➭ uso : *${prefix}add 55(ddd)xxxx-xxxx*
➭ Nota : o bot precisa ser admin!\n
➭ Comando : *${prefix}kick*
➭ útil em : remover membros do grupo
➭ uso : *${prefix}kick e o @da pessoa*
➭ Nota : Você precisa ser admin e o bot também\n
➭ Comando : *${prefix}promote*
➭ útil em : tornar membro do grupo um administrador
➭ uso : *${prefix}promote e o @da pessoa*
➭ Nota : Você precisa ser admin e o bot também\n
➭ Comando : *${prefix}demote*
➭ útil em : tornar o administrador um membro comum
➭ uso : *${prefix}demote e o @da pessoa*
➭ Nota : Você precisa ser admin e o bot também\n

       • ──── 𖦜 ───── •
      ⚡*_DOWNLOADER_*⚡
       • ──── 𖦜 ───── •
       
➭ Comando : *${prefix}ytvideo* [_*OFF*_]
➭ útil em : Baixar videos do youtube
➭ uso : *${prefix}ytvideo + url do video*\n
➭ Comando : *${prefix}ytmsc*
➭ útil em : Baixar videos do youtube no formato mp3 (musica)
➭ uso : *${prefix}ytmsc + nome da musica ou url*\n
➭ Comando : *${prefix}tomp3*
➭ útil em : Trasforma videos em mp3 (musica)
➭ uso : comando em resposta a um video

       • ──── 𖦜 ───── •
          ⚡*_AUDIO_*⚡
       • ──── 𖦜 ───── •

➭ Comando : *${prefix}audio*
➭ útil em : Trasforma texto em áudio
➭ uso : ${prefix}audio + codigo de idioma + texto
➭ Exemplo: ${prefix}audio pt Chollo o brabo\n
➭ Comando : *${prefix}est* ou *${prefix}estourar
➭ útil em : Estourar o audio marcado
➭ uso : ${prefix}est marcando o audio q deseja estourar

        • ──── 𖦜 ──── •
         ⚡*_OUTROS_*⚡
        • ──── 𖦜 ──── •
      
➭ Comando : *${prefix}doar*
➭ útil em : Doar quantias em dinheiro para ajudar o desenvolvimento do bot😊😁
➭ uso : basta enviar o comando \n    
➭ Comando : *${prefix}bug*
➭ útil em : Envia report de bugs ao proprietário do bot
➭ uso : ${prefix}bug "Seu report aqui" \n  
➭ Comando : *${prefix}outros*
➭ útil em : Envia o número dos meus companheiros :)
➭ uso : basta enviar o comando\n  
➭ Comando : *${prefix}info*
➭ útil em : Exibir informações sobre o bot
➭ uso : basta enviar o comando \n 
➭ Comando : *${prefix}lista*
➭ útil em : Listar os mais gados do grupo
➭ uso : basta enviar o comando \n    
➭ Comando : *${prefix}ping*
➭ útil em : Mostrar o tempo de resposta do bot
➭ uso : *basta enviar o comando*
➭ Comando : *${prefix}wame ou wa.me*
➭ útil em : Gerar um link whatsapp com seu número
➭ uso : basta enviar o comando \n 
➭ Comando : *${prefix}gay*
➭ útil em : O bot diz o quanto % gay vc parece ser (não leve a serio)
➭ uso : basta enviar o comando \n
➭ Comando : *${prefix}shitpost*
➭ útil em : Passar contatos de shitposters
➭ uso : basta enviar o comando
➭ Nota:  Quer seu nome e numero aqui? Entre em contato comigo: WA.me/994406695196 \n
➭ Comando : *${prefix}urlimg*
➭ útil em : Tirar prints de sites da web
➭ uso : ${prefix}urlimg "seu link aqui" \n  
➭ Comando : *${prefix}ctt*
➭ útil em : manda o contato do criador
➭ uso : basta enviar o comando\n      
➭ Comando : *${prefix}nsfwloli*
➭ útil em : mandar imagens aleatórias de nsfw loli
➭ uso : basta enviar o comando\n
➭ Comando : *${prefix}ocr*
➭ útil em : pegar o texto da foto e lhe enviar
➭ uso : responder imagem ou enviar mensagem com legenda\n
➭ Comando : *${prefix}setprefix*
➭ útil em : alterar o prefixo do bot
➭ uso : *${prefix}setprefix [texto|opcional]*\nexemplo : *${prefix}setprefix ?*
➭ Nota : Usado somente pelo proprietário do bot\n
➭ Comando : *${prefix}creditos*
➭ útil em : Envia os creditos dos criadores
➭ uso : basta enviar o comando\n

   • ────── 𖦜 ────── •
   ⚠️⚡_*GRUPO OFC*_⚡⚠️
   • ────── 𖦜 ────── •

*_ENTRE NO GRUPO OFICIAL DO BOT_*:

${gplink}

*_SE QUISER SABER MAIS, ENVIE O COMANDO ${prefix}gp_*

   • ────── 𖦜 ────── •
   ⚠️⚡_*INFORMAÇÕES*_⚡⚠️
   • ────── 𖦜 ────── •
   
   _*Instagram do criador:*_
     https://instagram.com/goulart_001
     
   *Número: wa.me/5561981316353*
  

╔════════════════════
  BY: ๖ۣۜ͡ஓீ͜͡𝐶𝐻Ծ̸𝐿𝐿Ծ̸⧽͜͜🔥⃟ɪᴏs✞
  FALE CMG:
  ${melink}
  
  Estou off? Aqui vai o numero dos meus companheiros:
  
  𝐵𝑂𝑇𝐼𝑁𝐻𝑂 𝐵𝑌 𝐶𝐻Ծ̸𝐿𝐿Ծ̸:
  ${botlink}
  𝐶𝐽 𝐵𝑂𝑇:
  ${cjlink}
  𝐿𝑂𝐺 𝐵𝑂𝑇:
  ${loglink}
  𝒦𝒶𝓀𝓊𝓏𝓊𝕭𝖔𝕿 𝐵𝑂𝑇:
  ${boelink}
  НЯИ‽ 𝐵𝑂𝑇:
  ${hrnlink}
  
  Para ver todos envie ${prefix}outros
  
╚════════════════════`
}

exports.help = help

}
starth()




