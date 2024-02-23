const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });
const ayarlar = require('./ayarlar.json');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

const prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('DD-MM-YYYY HH:mm:ss')}] ${message}`);
};

client.on('ready', () => {
  client.api.applications(client.user.id).commands.post({ data: {
    name: 'Yardım',
    description: 'Yardım'
  }});
});



// Yukarıdaki kodlar burada...

client.on('guildMemberAdd', (member) => {
  const AUTOMATIC_ROLE_ID = '1093304850525212922';
  const automaticRole = member.guild.roles.cache.get(AUTOMATIC_ROLE_ID);
  if (automaticRole) {
    member.roles.add(automaticRole)
      .then(() => {
        console.log(`Yeni üye "${member.user.tag}"'a rol verildi.`);
      })
      .catch((error) => {
        console.error('Rol verme hatası:', error);
      });
  } else {
    console.error(`"${1093304850525212922}" ID'sine sahip bir rol bulunamadı!`);
  }
});

// Aşağıdaki kodlar burada...


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.on('message', msg => {
    if (msg.content.toLowerCase() === 'merhaba') {
        msg.channel.sendMessage('Selam');
    }
});




client.on('message', (message) => {
    if (message.author.bot) return; // Diğer botların mesajlarına yanıt vermemesi için kontrol ediyoruz
  
    if (message.content.toLowerCase() === 'merhaba') {
      message.channel.send('Merhaba! Hoşgeldin!');
    } else if (message.content.toLowerCase() === 'selam') {
      message.channel.send('Selam! Nasıl gidiyor?');
    }
  });


  client.on('message', (message) => {
    if (message.author.bot) return; // Diğer botların mesajlarına yanıt vermemesi için kontrol ediyoruz
  
    if (message.content.toLowerCase() === 'sarı') {
      message.channel.send('kırmızı');
    } else if (message.content.toLowerCase() === 'şampiyon') {
      message.channel.send('cimbom');
    } 
  });


  client.on('message', (message) => {
  if (message.author.bot) return; // Diğer botların mesajlarına yanıt vermemesi için kontrol ediyoruz

  if (message.content.toLowerCase() === 'champion') {
    message.channel.send('**GALATASARAY**');
  } else if (message.content.toLowerCase() === 'fatiha') {
    message.channel.send('**Bismillahirrahmanirrahim Elhamdulillâhi rabbilalemin Errahmânirrahim Mâliki yevmiddin İyyâke na budu Ve iyyâke neste în İhdinessirâtal mustakîm Sirâtallezine en amte aleyhim Ğayrilmağdûbi aleyhim ve leddâllîn AMİN**');
  }
});

client.on('message', (message) => {
  if (message.author.bot) return; // Diğer botların mesajlarına yanıt vermemesi için kontrol ediyoruz

  if (message.content.toLowerCase() === 'sa') {
    message.channel.send('Aleyküm Selam ');
  } else if (message.content.toLowerCase() === 'selamun aleyküm') {
    message.channel.send('aleyküm selam');
  }
});


client.on('message', (message) => {
  if (message.author.bot) return; // Diğer botların mesajlarına yanıt vermemesi için kontrol ediyoruz

  if (message.content.toLowerCase() === 'rte') {
    message.channel.send('https://r.resimlink.com/pBIgYrcTZkE7.jpg');
  } else if (message.content.toLowerCase() === 'kk') {
    message.channel.send('https://r.resimlink.com/bgqF1_H.jpg');
  }
});

client.on('ready', () => {
  const channel = client.channels.cache.get('1093556277403189319');
  if (channel.type === 'voice') {
    channel.join()
      .then(connection => {
        console.log(`Connected to ${connection.channel.name}!`);
      })
      .catch(console.error);
  } else {
    console.log('Error: Channel is not a voice channel.');
  }
});

client.on('voiceStateUpdate', (oldState, newState) => {
  if (newState.member.user.bot) { // bot kullanıcısı ise
    if (newState.channel) { // ses kanalına katıldıysa
      newState.setDeaf(true); // sağırlaştır
    } else { // ses kanalından ayrıldıysa
      newState.setDeaf(false); // sağırlaştırmayı kaldır
    }
  }
});

client.on('voiceStateUpdate', (oldState, newState) => {
  if (oldState.member.user.bot && oldState.channelID && oldState.channel.members.size === 1) {
    oldState.setMute(true)
      .catch(console.error);
  }
});


client.on('ready', () => {

  // Oynuyor Kısmı
  
      var actvs = [
        
        `${prefix} We Are The Champions `
    ];
    
    //client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING' });
    let i = 0
setInterval(() => {
  client.user.setActivity(actvs[i], {type: 'LISTENING'});
  i += 1;
  if (i == actvs.length)
    i = 0;
}, 15000);
    
  
      console.log ('_________________________________________');
      console.log (`  Kullanıcı İsmi     : ${client.user.username}`);
      console.log (`  Sunucular          : ${client.guilds.cache.size}`);
      console.log (`  Kullanıcılar       : ${client.users.cache.size}`);
      console.log (`  Prefix             : ${ayarlar.prefix}`);
      console.log (`  Durum              : Bot Çevrimiçi!`);
      console.log ('_________________________________________');
    
    });
client.on('ready', ()=>{
client.channels.get(899769077998972928).join()
})

client.on('ready', () => {
  client.user.setPresence({
    status: 'dnd',
    activity: {
      name: 'with fire',
      type: 'PLAYING'
    }
  });
});

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.login(process.env.token);
