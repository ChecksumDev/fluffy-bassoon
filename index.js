const Discord = require("discord.js");
const fs = require("fs");
const Enmap = require("enmap");
const client = new Discord.Client();
require("dotenv-flow").config();

client.commands = new Enmap();

const config = {
  token: process.env.TOKEN,
  owner: process.env.OWNER,
  prefix: process.env.PREFIX
};

client.on("message", message => {
  if (message.author.bot) return;

  const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ + /g);

  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);
  if (!cmd) return;

  cmd.run(client, message, args);
});

fs.readdir("./commands", async (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let cmdName = file.split(".")[0];
    console.log(`Loaded command '${cmdName}'.`);
    client.commands.set(cmdName, props);
  });
});

client.login(config.token);
