
const Discord = require("discord.js"); // discord.js
const client = new Discord.Client(); // client
const weirdapi = require("weirdapi.js");

// on ready
client.on("ready", () => {
  
  const readytxt = `
__________________________________
Logged In Successfully!
UserName: ${client.user.tag}
ID: ${client.user.id}
Servers: ${client.guilds.size}
Users: ${client.users.size}
__________________________________

`
  console.log(readytxt); // print ^
  
});

client.on("message", async (message) => {
  
  
  if (!message.guild || message.author.bot) return;
  let prefix = ":?"
  
  if (message.channel.id === "yourchannelid") {
    
    
    let input = message.content;
    
    message.channel.startTyping();
    
    let output = await weirdapi.chat(input)
    
    message.channel.stopTyping();
    
    return message.reply(output)
    
    
    
  }
  
  if (!message.content.startsWith(prefix)) return;
  
  let args = message.content.slice(prefix.length).trim().split(" ");
  let cmd = args.shift().toLowerCase();
  
  // Lets make command handler
  
  try {
    
    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args);
  } catch (e) {
    
    console.log(e)
    
  }
  
  
});
// serverstats
// on member add
client.on("guildMemberAdd", (member) => {

  var ops = {
    total: "total-membercount-channel-id",
    humans: "humans-count-channel-id",
    bots: "bots-count-channel-id"
  }
  
  member.guild.channels.get(ops.total).setName(`Total Members: ${member.guild.memberCount}`); // total membercount
  member.guild.channels.get(ops.humans).setName(`Humans: ${member.guild.members.filter(m => !m.user.bot).size}`); // humans
  member.guild.channels.get(ops.bots).setName(`Bots: ${member.guild.members.filter(m => m.user.bot).size}`); // bots

});

// on member remove
client.on("guildMemberRemove", (member) => {

  var ops = {
    total: "total-membercount-channel-id",
    humans: "humans-count-channel-id",
    bots: "bots-count-channel-id"
  }
  
  member.guild.channels.get(ops.total).setName(`Total Members: ${member.guild.memberCount}`); // total membercount
  member.guild.channels.get(ops.humans).setName(`Humans: ${member.guild.members.filter(m => !m.user.bot).size}`); // humans
  member.guild.channels.get(ops.bots).setName(`Bots: ${member.guild.members.filter(m => m.user.bot).size}`); // bots

});




client.login("Your Token here"); // login your bot to discord
