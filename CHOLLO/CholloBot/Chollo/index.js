const {
	WAConnection,
	MessageType,
	Presence,
	Mimetype,
	GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { help1 } = require('./src/help1')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const ytdl = require('ytdl-core')
const shell = require('shelljs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const imgbb = require('imgbb-uploader')
const lolis = require('lolis.life')
const loli = new lolis()
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const pesqon = false;
const urlimgon = false;
const nsfwon = false;
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
prefix = '.'
blocked = []

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

function kyun(seconds) {
	function pad(s) {
		return (s < 10 ? '0' : '') + s;
	}
	var hours = Math.floor(seconds / (60 * 60));
	var minutes = Math.floor(seconds % (60 * 60) / 60);
	var seconds = Math.floor(seconds % 60);

	//return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
	return `${pad(hours)} Hora ${pad(minutes)} Minuto ${pad(seconds)} Segundo`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./BarBar.json') && client.loadAuthInfo('./BarBar.json')
	client.on('connecting', () => {
		start('2', 'Connecting...')
	})
	client.on('open', () => {
		success('2', 'Connected')
	})
	await client.connect({ timeoutMs: 30 * 1000 })
	fs.writeFileSync('./BarBar.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Olá @${num.split('@')[0]}\nBem vindo ao grupo ${mdata.subject}\nSe comporte porra`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, { caption: teks, contextInfo: { "mentionedJid": [num] } })
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Tchau @${num.split('@')[0]} tava na hora KKKKK`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, { caption: teks, contextInfo: { "mentionedJid": [num] } })
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

	client.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
		for (let i of json[1].blocklist) {
			blocked.push(i.replace('c.us', 's.whatsapp.net'))
		}
	})

	client.on('chat-update', async (mek) => {
		try {
			if (!mek.hasNewMessage) return
			mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = 'f76ec67a-6a73-43d6-8494-8d4d4bcdd36d'
			//const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: '⌛ Espere, comando em execução⌛',
				success: '✔️ Nice mlk, deu certo ✔️',
				error: {
					stick: '⚠️ Error: não foi possivel converter imagem em figurinha ⚠️',
					Iv: '❌ Link invalido poh ❌'
				},
				only: {
					group: '❌ Desculpe, esse comando só pode ser usado em grupos❌',
					ownerG: '⚠️ KKK, só o dono pode usar isso poh KKKK',
					ownerB: '❌ KKK, só o dono pode usar isso poh KKKK ❌',
					admin: '⚠️ Só adm pode usar esse comando garai KKK😝',
					Badmin: '❌ O Bot não é adm, tu quer q eu faça magica?? KKK❌'
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = ["556181316353@s.whatsapp.net", "994406695196@s.whatsapp.net", "554999929075@s.whatsapp.net", "15803133703@s.whatsapp.net"] // replace this with your number
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : true
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
				return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, { quoted: mek })
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": memberr } })
			}

			colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			switch (command) {
				case 'help':
				case 'menu':
					client.sendMessage(from, help(prefix), text)
					break
				case 'help1':
				case 'menu1':
					client.sendMessage(from, help1(prefix), text)
					break
				case 'info':
					me = client.user
					uptime = process.uptime()
					client.sendMessage(from, `Nome do bot: ${me.name} \n Número do bot: ${me.jid.split('@')[0]} \n Prefixo: "${prefix}" \n Contato de bloqueio total: ${blocked.length} \n Link do bot para divulgação: \n https://wa.me/${me.jid.split('@')[0]} \n ou \n https://api.whatsapp.com/send?phone=${me.jid.split('@')[0]}&text=${prefix}help`, text)
					break
				case 'blocklist':
					teks = 'Esta é a lista de números bloqueados :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": blocked } })
					break
				case 'ocr':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, { lang: 'eng+ind', oem: 1, psm: 3 })
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Só uma foto menó')
					}
					break
				case 'stiker':
				case 'sticker':
					return reply('este comando foi atualizado para ".fig"')

				case 'fig':
				case 'figurinha':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❌ Error: ao converter ${tipe} para figurinha`)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'Your-ApiKey'
						await removeBackgroundFromImageFile({ path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp }).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Error, tente denovo mais tarde, se nao der, entre em contato com o propietario')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								client.sendMessage(from, fs.readFileSync(ranw), sticker, { quoted: mek })
							})
						})
					} else {
						reply(`Envie fotos com legendas ${prefix}fig ou responda imagens que já foram enviadas `)
					}
					break
				case 'porno':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx3BgnL2qAHDTlfCPMAvdjuLGvOx402dSdhw&usqp=CAU`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: 'Adm proibiu porno no gp🙄' })
					break
				case 'belle2':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://4.bp.blogspot.com/-pBwX3-rdXeM/XwTW_9oT_9I/AAAAAAAAPt4/_jmeK-lOJMoE4gPYvhgFqzOp-uKnNN9ygCLcBGAsYHQ/s1600/boabronha_2.jpg`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: 'slc' })
					break
				case 'bot':
					reply(`Bot online, envie "${prefix}help" ou "${prefix}menu" para exibir os comandos`)
					break
				case 'belle3':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://1.bp.blogspot.com/-3K_b14RzHTA/XwTW7SQTPRI/AAAAAAAAPtY/UOaKURECbzwXfvASa3g6Pz0D_Ha73Dw4wCLcBGAsYHQ/s1600/boabronha_10.jpg`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: 'olha p isso mano, pqp ' })
					break
				case '2d':
					meme = await kagApi.memes()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFAocqaur5ZX1DPN6ZGP8PJy2cNppas_gYA&usqp=CAU`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: '.......' })
					break
				case 'loli1':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/iphQUGi.jpg`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: 'hmm, então quer ver loli?' })
					break
				case 'hentai':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/8U9GwX4.jpg`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: 'Cara bate pra 2d 😂' })
					break
				case 'bomdia':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/7VL9cFf.jpg`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: 'Bom dia, vcs sao fodas ❤️' })
					break
				case 'boatarde':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/JaO3yoV.jpg`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: 'Boa tarde, rapeize 😎👍' })
					break
				case 'belle':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZu6GwgURUgkuWZXOq-KPLRvA5LOezhvY_VQ&usqp=CAU`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: '👀' })
					break
				case 'belle1':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ7ot6RZPnXSJFFKVjPoeXHjTYyi6uk5W_mA&usqp=CAU`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: '👀' })
					break
				case 'mia':
					try {
						memein = await kagApi.memeindo()
						buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaKeXU5ryvFTNz6nJm9cioGCoeqlZQSh1Mgw&usqp=CAU`)
						client.sendMessage(from, buffer, image, { quoted: mek, caption: '👀' })
						break
					}
					catch (e) {
						return reply("error, tente novamente")
						client.sendMessage(ownerNumber, "Error em mia: \n \n" + e)
						break
					}
				case 'lofi':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9hZBPRo16fIhsIus3t1je2oAU23pQqBpfw&usqp=CAU`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: '💆' })
					break
				case 'gstza1':
					try {
						memein = await kagApi.memeindo()
						buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtbo5EcVSGj-IvEVznHIgMZ9vjFptZfvprtg&usqp=CAU`)
						client.sendMessage(from, buffer, image, { quoted: mek, caption: '💆' })
						break
					}
					catch (e) {
						return reply("error, tente novamente")
						client.sendMessage(ownerNumber, "Error em gstza1: \n \n" + e)
						break
					}
				case 'mia1':
					try {
						memein = await kagApi.memeindo()
						buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjVCGkGDxARumfloekQMCazM8uvpj2AgW2lg&usqp=CAU`)
						client.sendMessage(from, buffer, image, { quoted: mek, caption: '👀' })
						break
					}
					catch (e) {
						return reply("error, tente novamente")
						client.sendMessage(ownerNumber, "Error em mia1: \n \n" + e)
						break
					}
				case 'gstza2':
					try {
						memein = await kagApi.memeindo()
						buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlc2hMIJ4PjW5tIXltrKe6xeBoKPLKTZMnQ&usqp=CAU`)
						client.sendMessage(from, buffer, image, { quoted: mek, caption: '🤭' })
						break
					}
					catch (e) {
						return reply("error, tente novamente")
						client.sendMessage(ownerNumber, "Error em gstza2: \n \n" + e)
						break
					}
				case 'mia2':
					try {
						memein = await kagApi.memeindo()
						buffer = await getBuffer(`https://i.gifer.com/7udO.gif`)
						client.sendMessage(from, buffer, video, { quoted: mek, caption: 'use o .sticker para ver o gif da mia' })
						break
					}
					catch (e) {
						return reply("error, tente novamente")
						client.sendMessage(ownerNumber, "Error em gstza2: \n \n" + e)
						break
					}
				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`O prefixo foi alterado com sucesso para : ${prefix}`)
					break
				case 'loli':
					//if (true) return reply("comando desativado por flood")
					try {
						loli.getSFWLoli(async (err, res) => {
							if (err) return reply('❌ ERROR ❌')
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, { quoted: mek, caption: '.' })
						})
					}
					catch (e) {
						reply("❌ ERROR ❌")
						console.log("ERROR: " + e)
					}
					break
				case 'nsfwloli':
					if(nsfw == false) return reply("Comando desativado...")
 					loli.getNSFWLoli(async (err, res) => {
						if (err) return reply('❌ ERROR ❌')
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, { quoted: mek, caption: '🤭' })
					})
					break
				case 'marcar':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `# @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
				case 'marcar2':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ' '
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					reply(teks)
					break
				case 'marcar3':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, teks, text, { detectLinks: false, quoted: mek })
					break
				case 'limpar':
					if (!isOwner) return reply('Só o dono do bot pode usar...')
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply('Excluido todos os chats com sucesso, agr so vapo')
					break
				case 'ts':
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, { caption: `[ ISSO E UMA TRANSMISSÃO ]\n\n${body.slice(4)}` })
						}
						reply('Transmissão enviada com sucesso')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `TRANSMISSÃO:\n\n${body.slice(4)}`)
						}
						reply('Transmissão enviada com sucesso')
					}
					break
				case 'promote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length < 2) {
						client.groupMakeAdmin(from, mentioned)
						client.sendMessage(from, `Esse carinha aqui @${mentioned[0].split('@')[0]} agr é adm...`, text)
					}
					else if (mentioned.length >= 2) {
						client.sendMessage(from, "1 pessoa de cada vez", text)
					}
					break
				case 'demote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length < 2) {
						client.groupDemoteAdmin(from, mentioned)
						client.sendMessage(from, `Esse carinha aqui @${mentioned[0].split('@')[0]} agr não é mais adm...`, text)
					}
					else if (mentioned.length >= 2) {
						client.sendMessage(from, "1 pessoa de cada vez", text)
					}
					break
				case 'add':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('quem você deseja adicionar, bobao')
					if (args[0].startsWith('08')) return reply('Use o código do país')
					try {
						pess = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [pess])
					} catch (e) {
						console.log('Error :', e)
						reply('Falha ao adicionar a pessoa: \n \n' + e)
					}
					break
				case 'kick':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Marque quem vc quiser remover')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length < 2) {
						client.sendMessage(from, `@${mentioned[0].split('@')[0]} levou ban KKKKKKKK`, text)
						client.groupRemove(from, mentioned)
					}
					else if (mentioned.length >= 2) {
						client.sendMessage(from, "1 pessoa de cada vez", text)
					}
					break
				case 'marcaradm':
					if (!isGroup) return reply(mess.only.group)
					teks = `Lista de admins do grupo ${groupMetadata.subject}\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'linkgroup':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					linkgc = await client.groupInviteCode(from)
					reply('https://chat.whatsapp.com/' + linkgc)
					break
				case 'leave':
					if (!isGroup) return reply(mess.only.group)
					if (isGroupAdmins || isOwner) {
						client.groupLeave(from)
					} else {
						reply(mess.only.admin)
					}
					break
				case 'toimg':
					if (!isQuotedSticker) return reply('❌ responda um sticker ❌')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Falha ao converter adesivos em imagens ❌')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, { quoted: mek, caption: '>//<' })
						fs.unlinkSync(ran)
					})
					break
				case 'welcome':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('1 para ligar e 0 para desligar...')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Já ta ativo...')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Pronto, toda vez q alguem entrar ou sair, vou avisar ✔️')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Desativou com sucesso o recurso de boas-vindas neste grupo ✔️')
					} else {
						reply('1 para ativar, 0 para desativar')
					}
					break
				case 'clone':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('A tag alvo que você deseja clonar')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`Foto de perfil atualizada, usando foto de @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('ERROR')
					}
					break
				case 'pesq':
					if(pesqon == false) return reply("Comando desativado ou está em reforma...")
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, { quoted: mek, caption: res.teks.trim() })
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('Só uma foto')
					}
					break

				case 'bug':
					if (args.length < 1) return reply(`Uso: ${prefix}bug "O que desejar reportar"`)
					var msgp = body.slice(4).trim()
					var eu = '556181316353@s.whatsapp.net'
					client.sendMessage(from, "Enviando report para propietario", text, { quoted: mek })
					client.sendMessage(eu, "Report de bugs:\n Report feito por: " + from + "\n\nMensagem: " + msgp, text, { quoted: mek })
					client.sendMessage(from, "Report enviado com sucesso: \n\n" + msgp, text, { quoted: mek })
					break

				case 'meme':
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=MEMESBRASIL`, { method: 'get' })
					ri = JSON.parse(JSON.stringify(anu));
					ze = ri[Math.floor(Math.random() * ri.length)];
					nye = await getbufferer(ze);
					client.sendMessage(from, nye, image, { caption: '😂', quoted: mek })
					await limitAdd(sender)
					break

				case 'guigui':
					client.sendMessage(from, 'Ai guigui bota teu quimono 🤤🥵', text)
					break

				case 'shitpost':
					if (true) return reply('Contatos que postam shitpostagem todo dia: \n \n 🐊 ⃤𝑳 𝑬 𝑶 𝒁 𝑰 𝑵͢  𝑺 𝑯 𝑰 𝑻᭄ ᶠᴬᴷᴱ🚩: \n https://api.whatsapp.com/send?phone=+19892641246&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \n 🎴⃟࿗𝑇𝑼𝒁𝑰𝑀🏴󠁧󠁢󠁥󠁮󠁧󠁿⃟𝑮𝑈𝐷𝒀𝑆⧽͜͜💉: \n https://api.whatsapp.com/send?phone=556191450011&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \n ீ͜ৡৢ͜͡🌆⃟ᬊ͜͡ÉřøŠénîn🌹๋ོ࣭ꦿꜜ: \n https://api.whatsapp.com/send?phone=556192036059&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \n ꧁༒𝑀₳𝐿₩₳Ʀ𝐸༒꧂: \n https://api.whatsapp.com/send?phone=559285400866&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \n 🌷⃟ LAMEC😡🤬: \n https://api.whatsapp.com/send?phone=557583461670&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \n ⚡𝑴𝒊𝒏𝒂𝒕𝒊𝒏 𝒅𝒐 𝒔𝒉𝒊𝒕𝒔⚡: \n https://api.whatsapp.com/send?phone=5514981134285&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \n DouglinhasShits: \n https://api.whatsapp.com/send?phone=553291967399&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \n Røcha: \n https://api.whatsapp.com/send?phone=553388475462&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \n 🌀🔥ᵖᵃⁱⁿ𝑲𝛬𝑲𝛬𝑹𝑂𝑻𝑂 ×͜× 𝚯𝙁: \n https://api.whatsapp.com/send?phone=558296418899&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \n 🔥Gabriel ꉔØ$₮₮₳🔥 ⁩ࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩ̳̳̳̳̳̳̳̳̳̳̳̳̳̳̳̳̳̳̳̳ࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧ͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌ *͍͍͍͍͍͍͍͍͍͍͍͍͍͍͍͍͍͍͍͍͍ۗۖۖۖۗۖۗۖۗۖۖۗۖۗۖۗۖ₅ۗۖۖۗۖۖۗۖۖۗۖۖۖۖۖۗۗۗۗ * ⁩ࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩ̳̳̳̳̳̳̳̳̳̳̳̳̳̳̳̳̳̳̳̳ࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧ͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌ *͍͍͍͍͍͍͍͍͍͍͍͍͍͍͍͍͍͍͍͍͍ۗۖۖۖۗۖۗۖۗۖۖۗۖۗۖۗۖۗۖ₅ۗۖۖۗۖۖۗۖۖۗۖۖۖۖۖۗۗۗۗ * ⁩ࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧ*ࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧ: \n https://api.whatsapp.com/send?phone=554298303297&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \n ⏤͟͟͞͞𝑯𝑮𝑳 🇦🇱⃤ 𝑻𝒉𝒆𝒖𝒔: \n https://api.whatsapp.com/send?phone=5511934025222&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \n 𒂕⨌𝐁𝐎𝐋𝐒𝐎𝐍𝐀𝐑𝐎᎗𝐀𝐆𝐈𝐎𝐓𝐀⨌𒂕: \n https://api.whatsapp.com/send?phone=5528999516479&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \n ☬GuᎥᏞhᎬᏒmᎬ☆ sᏢᎾᏞᎪᎠᎾᏒᎥᎬ☬: \nhttps://api.whatsapp.com/send?phone=5527988454228&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \n 𝑻𝒊𝒐 𝒔𝒂𝒏𝒕𝒕: \n https://api.whatsapp.com/send?phone=557186960583&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \n ★᭄⃟⃟⃟⃟⃚🔥𝙳𝚎𝚊𝚗ˢʰⁱᵗˢ⛧᭄: \nhttps://api.whatsapp.com/send?phone=5521996624796&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \n Silkyzin: \n https://api.whatsapp.com/send?phone=557188084892&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \n ㍍⃟͢🥀𝙁𝙖𝙡𝙡𝙯🌹: \n https://api.whatsapp.com/send?phone=5518981226047&text=Eae%20men%2C%20vim%20pelo%20bot%20do%20CHOLLO%2C%20salva%20ae%3A%20 \n \nQuer seu nome e numero aqui? Entre em contato comigo: WA.me/994406695196 ')
					break

				case 'ctt':
					if (true) return reply('Entre em contato: wa.me/+994406695196')
					break

				case 'creditos':
					if (true) return reply('Creditos: Dark YT \n 🎴⃟࿗𝑇𝑼𝒁𝑰𝑀🏴󠁧󠁢󠁥󠁮󠁧󠁿⃟𝑮𝑈𝐷𝒀𝑆⧽͜͜💉 \n Eu KKKK wa.me/+994406695196', text)
					break

				case 'doar':
					reply("Obrigado por pensar em doar pra mim😊. \n Doando vc pode ajudar no desenvolvimento do bot. \n Metodos de pagamentos: \n \n - Email do paypal: cholloofc@gmail.com")
					break

				case 'gay':
					rate = body.slice(1)
					const num = ['heteror tops', '0', '4', '9', '17', '28', '34', '48', '59', '62', '74', '83', '97', '100', '29', '94', '75', '82', '41', '39', 'gayzão']
					const pct = num[Math.floor(Math.random() * num.length)]
					client.sendMessage(from, rate + ' \n O quão gay \n Resultado: ' + pct + '%', text, { quoted: mek })
					break

				case 'wa.me':
				case 'wame':
					client.updatePresence(from, Presence.composing)
					options = {
						text: `「 SEU LINK WHATSAPP 」\n \n Solicitado por: @${sender.split("@s.whatsapp.net")[0]} \n \n Seu link Whatsapp : \n *https://wa.me/${sender.split("@s.whatsapp.net")[0]}*\n\n Ou \n *https://api.whatsapp.com/send?phone=${sender.split("@")[0]}*`,
						contextInfo: { mentionedJid: [sender] }
					}
					client.sendMessage(from, options, text)
					break

				case 'urlimg':
					if(urlimgon == false) return reply("Comando desativado ou está em reforma...")
					if (args.length < 1) return reply(`Error\nUso do comando: ${prefix}imagem "url do site que você quer a foto"`)
					try {
						var murl = args[0]
						if (!args[0].startsWith("http")) murl = "http://" + murl
						reply("Aguarde... caso não envie a foto, conte ate 10 e tente novamente")
						const buffer0 = await getBuffer(`http://free.pagepeeker.com/v2/thumbs.php?size=x&url=${murl}`)
						sleep(5000)
						const buffer = await getBuffer(`http://free.pagepeeker.com/v2/thumbs.php?size=x&url=${murl}`)
						client.sendMessage(from, buffer, image, { quoted: mek })
						reply("Foto do site " + murl)
						break
					}
					catch (e) {
						reply("Error, tente novamente")
						console.log("ERROR: " + e)
						break
					}

				case 'nsfwon':
					if(!isOwner) return reply(mess.only.ownerB) 
					if (nsfwon == true){
						nsfwon = false;
						reply("Comando nsfwloli desativado")
					}
					else if(nsfwon == false){
						nsfwon = true;
						reply("Comando nsfwloli ativado")
					}
				
				case 'pesqon':
					if(!isOwner) return reply(mess.only.ownerB) 
					if (pesqon == true){
						pesqon = false;
						reply("Comando pesq desativado")
					}
					else if(pesqon == false){
						pesqon = true;
						reply("Comando pesq ativado")
					}
					
				case 'urlimgon':
					if(!isOwner) return reply(mess.only.ownerB) 
					if (urlimgon == true){
						urlimgon = false;
						reply("Comando urlimg desativado")
					}
					else if(urlimgon == false){
						urlimgon = true;
						reply("Comando urlimg ativado")
					}	


				case 'diga':
					if (args.length < 1) return reply("oq vc quer q eu diga?")
					const diz = body.slice(5).trim()
					client.sendMessage(from, diz, text, { quoted: mek })
					break

				case 'soadm':
					if (isGroup) {
						if (isGroupAdmins) {
							if (isBotGroupAdmins) {
								var aberto = GroupSettingChange.messageSend
								if (Number(args[0]) === 0) {
									if (true) {
										reply("Grupo Aberto")
										// reply(GroupSettingChange.messageSend)
										client.groupSettingChange(from, GroupSettingChange.messageSend, false)
									}
									else return reply("Grupo já está aberto")
									break
								}
								else if (Number(args[0]) === 1) {
									if (true) {
										// reply(GroupSettingChange.messageSend)
										reply("Grupo Fechado")
										client.groupSettingChange(from, GroupSettingChange.messageSend, true)
									}
									else return reply("Grupo já está fechado")
									break
								}
								else return reply("1 para abrir o grupo e 0 para fechar")
							}
							else return reply("O bot não é adm😕")
						}
						else return reply("So adm pode usar KKKKKK bobinho")
					}
					else return reply(mess.only.group)
					break

				default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[ERROR]', 'red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}

			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()