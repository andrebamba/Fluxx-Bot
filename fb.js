const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config");
var fs = require('fs');
var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));


client.on('ready', () => {
    client.user.setPresence({ game: { name: "you type 'help for help!", type: 2 } });
      client.user.setStatus("dnd");
    console.log(`Fluxx Bot reporting for duty at ${client.users.size} servers, and as ${client.user.tag}!`);
  });

  client.on('guildMemberAdd', member => {
    member.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Welcome to the Server!",
        description: "Welcome to this amazing server! Type 'help for questions on anything.",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "Fluxx"
        }
      }
      });
    });

  
  client.on("message", message => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let member = message.mentions.members.first();
    var sender = message.author;

    if (!userData[sender.id]) userData[sender.id] = {
      messagesSent: 0

    }

    userData[sender.id].messagesSent++;

    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
      if (err) console.error(err);
    })



    if(command === 'talk') {
      message.channel.send('HAHAAHHA LMFAO YOU THOUGHT I COULD TALK ??? NLS.')
    }

    if(command === 'embed') {

      const sayMessage = args.join(" ");
      message.channel.send({embed: {
        title: "Embed",
        color: 3447003,
        description: (sayMessage),
        timestamp: new Date(),
        footer: {
          icon_url: message.author.avatarURL,
          text: ` By ${message.author.tag}`
        }
      }});

    }

    if(command === 'protect') {
      message.channel.send('BEGONE :crossed_swords: :shield: THOT')
    }

    if(command === 'help') {
        message.channel.send({embed: {
            title: "Main Commands !",
            color: 3447003,
            description: (("***Hello! If you typed 'help, you came to understand more about this bot's functions. |//| To see what your API Latency is, type 'apilatency. |//| To kick a member, type 'kick @\'member' + reason. |//| Same things with ban, ecept beginning is 'ban. ***")),
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "Fluxx"
            }
          }});
    }
    if(command === "apilatency") {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        message.channel.send(`API Latency is ${Math.round(client.ping)}ms`);
        message.delete().catch(O_o=>{}); 
      }
    if(command === "say") {
        // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
        // To get the "message" itself we join the `args` back into a string with spaces: 
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete().catch(O_o=>{}); 
        // And we get the bot to say the thing: 
        message.channel.send(sayMessage);
      }

      if (message.content.startsWith("anime")) {
        message.channel.send("shut up weeb");
      }

    if(command === 'mute') {
      let member = message.mentions.members.first();

    }

      if(command === "kick") {
        if(!message.member.roles.some(r=>["Admin", "Moderator"].includes(r.name)) )
          return message.reply("Sorry, you don't have permissions to use this!");
        let member = message.mentions.members.first();
        if(!member)
          return message.reply("Please mention a valid member of this server :rage:");
        if(!member.kickable) 
          return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions? :thinking:");
        let reason = args.slice(1).join(' ');
        if(!reason)
          return message.reply("Please indicate a reason for the kick! :rage:");
        member.kick(reason)
          .catch(error => message.reply(`Sorry dawg, I couldn't kick because of : ${error}`));
        message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason} :thumbsup:`);
        message.delete().catch(O_o=>{}); 
      }

      if(command === "ban") {
        // Most of this command is identical to kick, except that here we'll only let admins do it.
        // In the real world mods could ban too, but this is just an example, right? ;)
        if(!message.member.roles.some(r=>["Admin"].includes(r.name)) )
          return message.reply("Sorry, you don't have permissions to use this! :rage:");
        
        let member = message.mentions.members.first();
        if(!member)
          return message.reply("C'mon, he has to be a real person. Mention someone proper. :frowning:");
        if(!member.bannable) 
          return message.reply("Uhh, bro I'm not sure I have the right permissions to do that. Check my perms. :thinking:");
    
        let reason = args.slice(1).join(' ');
        if(!reason)
          return message.reply("Dude you can't ban him for no reason. List one! :rage:");
        
        member.ban(reason)
          .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
        message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason} :thumbsup:`);
        message.delete().catch(O_o=>{}); 
      }
  })

  client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find('name', 'announcements');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Heyo! Welcome to this amazing server!  to the server, ${member}`);
  });





client.login(config.token);