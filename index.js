const discord = require("discord.js");
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const moment = require("moment");
const express = require("express");
const Discord = require("discord.js")
const fetch = require('node-fetch');
const app = express();
const client = new Discord.Client();
const prefix = '-'

setInterval(() => {
const Linkler = db.get('Linkler')
if(!Linkler) return;
const Oxygen = Linkler.map(Oxygen => Oxygen.url)
Oxygen.forEach(Link => {
try {
fetch(Link)
} catch(e) {
console.error(e)
}
})
console.log(`${client.user.username} | ${db.get('Proje') || 1} Proje Hostandı`)
}, 60000)

client.on('ready', () => {
console.log(`${client.user.username} Aktif!`)
if(!Array.isArray(db.get('Linkler'))) {
db.set('Linkler', [])
}
})
client.on('message', async message => {
  if(message.author.bot) return;
  var Split = message.content.split(' ')

  if(Split[0] == prefix+'ekle') {
  var Link = Split[1]
  fetch(Link).then(() => {
    const Oxygen = new Discord.MessageEmbed()
    .setColor('RED')
    .setDescription(`
    **==================================**
    **Link Sistemde Zaten Bulunuyor. <:no:910963847127523389>** 
    ==================================
    `)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL())
    if(db.get('Linkler').map(Oxygen => Oxygen.url).includes(Link)) return message.channel.send(Oxygen)
    const Oxygen = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setThumbnail(message.author.avatarURL())
    .setDescription(`
    **==================================**
    **Yazdığınız URL Başarıyla Eklendi. <:yes:910963836016803922>**
    `)
    .addField(prefix+'linkler','Komutunu Kullanarak Ekledigin Linklere Erisebilirsin')
    .setTimestamp()
    message.channel.send(Oxygen)
    db.push('Linkler', { url: Link, owner: message.author.id, owner2: message.author.tag})
    db.add(`Sahiplik_${message.author.id}`,1)
    db.push(`Projesi_${message.author.id}`,Link)
    db.add(`Proje`,1)
  }).catch(Hata => {
  const Oxygen = new Discord.MessageEmbed()
  .setColor('RED')
  .setDescription(`
  **==================================**
  **Hata: ${Hata} <:no:910963847127523389>**

  **Lutfen Bir URL Girin**
  ==================================
  `)
  .setImage('https://i.hizliresim.com/9naFeE.png')
  .setTimestamp()
  .setThumbnail(message.author.avatarURL())
  message.channel.send(Oxygen)
  })
  }

  if(Split[0] == prefix+'davet') {
  const Oxygen = new Discord.MessageEmbed()
  .setColor('#20aaba')
  .setDescription(`
  **==================================
Beni Sunucuna Eklemek Istemen Beni Sevindiriyor Hemen Altta Linkimi Bula Bilirsin Sen Olmassan 1 kisi eksik

[Ekleme Linkim](https://discord.com/api/oauth2/authorize?client_id=909574409910648853&permissions=8&scope=bot)

[Destek Sunucum](https://discord.gg/qmV57kwWFA)
==================================
**`)
  .setThumbnail(message.author.avatarURL())
  message.channel.send(Oxygen)
  }

  if(Split[0] == prefix+'i') {
  const Istatistik = new Discord.MessageEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL())
  .setTimestamp()
  .setDescription(`
**==================================**
**<:yes:910963836016803922> » Isim -** __${client.user.username}__
**<:yes:910963836016803922> » Kanal Sayısı -** __${client.channels.size}__
**<:yes:910963836016803922> » Sunucu Sayısı -** __${client.guilds.cache.size}__
**<:yes:910963836016803922> » Kullanıcı Sayısı -** __${client.guilds.cache.reduce((a,b) => a + b.memberCount,0).toLocaleString()}__
**<:yes:910963836016803922> » Link Sayısı -** __${await db.fetch('Proje') || 1}__
**<:yes:910963836016803922> » Aktiflik Suresi -** __${moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")}__
**==================================**`)
message.channel.send(Istatistik)
  }
  if(Split[0] == prefix+'istatistik') {
  const Istatistik = new Discord.MessageEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL())
  .setTimestamp()
  .setDescription(`
**==================================**
**<:yes:910963836016803922> » Isim -** __${client.user.username}__
**<:yes:910963836016803922> » Kanal Sayısı -** __${client.channels.size}__
**<:yes:910963836016803922> » Sunucu Sayısı -** __${client.guilds.cache.size}__
**<:yes:910963836016803922> » Kullanıcı Sayısı -** __${client.guilds.cache.reduce((a,b) => a + b.memberCount,0).toLocaleString()}__
**<:yes:910963836016803922> » Link Sayısı -** __${await db.fetch('Proje') || 1}__
**<:yes:910963836016803922> » Aktiflik Suresi -** __${moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")}__
**==================================**`)
message.channel.send(Istatistik)
  }

  if(Split[0] == prefix+'s') {
  const Oxygen = new Discord.MessageEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL())
  .setTimestamp()
  .setDescription(`
  ==================================
**» Şuanda Toplam \`${db.get('Proje')}\` URL Uptime Ediliyor <:yes:910963836016803922>**

**» Bunlardan Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tanesi Senin <:yes:910963836016803922>**
==================================`)
  message.channel.send(Oxygen)
  }
  if(Split[0] == prefix+'say') {
  const Oxygen = new Discord.MessageEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL())
  .setTimestamp()
  .setDescription(`
  ==================================
**» Şuanda Toplam \`${db.get('Proje')}\` URL Uptime Ediliyor <:yes:910963836016803922>**

**» Bunlardan Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tanesi Senin <:yes:910963836016803922>**
==================================`)
  message.channel.send(Oxygen)
  }

  if(Split[0] == prefix+'yardım') {
  const Oxygen = new Discord.MessageEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL())
  .setTimestamp()
  .setAuthor(client.user.username,client.user.avatarURL())
  .setDescription(`

> **<:sagok:910964706301313064> » Prefixim: ${prefix}**

`)
  .addField('**» Uptime Bot Komutlari**',`
  <a:kirmiziwumpus:910964812442374224> » [${prefix}ekle](https://discord.gg/qmV57kwWFA) Link Eklemenize Yarar
  <a:kirmiziwumpus:910964812442374224> » [${prefix}erişim-kontrol](https://discord.gg/qmV57kwWFA) Erişim Kontrol
  <a:kirmiziwumpus:910964812442374224> » [${prefix}linkler](https://discord.gg/qmV57kwWFA) Liklerinizi Gösterir
`)
  .addField('> **Hakkında**',`
  Bu Bot Botlarınızı 7/24 Yapmaya Yarar
  VDS Olmadan Bunu Yapabilir
  __7/24 Ücretsizdir!__
==================================
> <a:hype:910965537406861392> » [Destek Server](https://discord.gg/qmV57kwWFA)
> <a:hype:910965537406861392> » [Eklemek İçin](https://discord.com/oauth2/authorize?client_id=909574409910648853&permissions=8&scope=bot)`)
.setImage('https://cdn.discordapp.com/attachments/903621600367243285/910626978351161344/oxygencode.jpg')
  message.channel.send(Oxygen)
  }

    if(Split[0] == prefix+'linkler') {
    const Linkleri = db.fetch(`Projesi_${message.author.id}`)
    if (!db.get('Linkler').map(Oxygen => Oxygen.owner).includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setColor('#20aaba').setDescription(`**Hiç link eklememişsin. Link Eklemek İçin \`${prefix}ekle\` yazman yeterli**`))
    message.channel.send(new Discord.MessageEmbed().setColor('#20aaba').setDescription(`**Uptime Etmekte Olduğun Linkler Direkt Mesajlarına Gönderildi . Direkt mesajlarını kontrol et.  ${message.author}**`).setThumbnail(message.author.avatarURL()))
    message.author.send(new Discord.MessageEmbed().setColor('#20aaba').setDescription(`**» Normal Linklerin:** \n\n\``+Linkleri.join('\n')+`\``).setThumbnail(message.author.avatarURL()))
    }


    if(Split[0] == prefix+'erişim-kontrol') {
const Oxygen = new Discord.MessageEmbed()
.setColor('#20aaba')
.setThumbnail(message.author.avatarURL())
.setTimestamp()
.setTitle('🎈 Erişim Kontrol')
.setDescription('**» Erişiminiz Aktif**')
message.channel.send(Oxygen)
}
})

client.on('ready', () => {
client.user.setActivity(`${prefix}yardım | Oxygen Code`, { type: 'WATCHING' })
//client.user.setStatus('dnd')
})

client.on("message", async message => {

  if(!message.content.startsWith("eval")) return;
  if(!["903335977160945695","903335977160945695"].includes(message.author.id)) return;
  var args = message.content.split("eval")[1]
  if(!args) return message.channel.send(":x: ..")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })

const Log = message => {
console.log(`${message}`)
}
client.login('OTA5NTc0NDA5OTEwNjQ4ODUz.YZGRLg.9QbnwZ9T6SogBv0Vdc6HZV7gWtk')