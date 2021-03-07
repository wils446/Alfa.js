import { Client, Collection } from "discord.js";
import fs from "fs";
import dotenv from "dotenv";
import { Command } from "./interfaces/Command";

dotenv.config({ path: "../.env" });

const client = new Client();
const commands: Collection<string, Command> = new Collection();

const commandFiles = fs.readdirSync("./commands");

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.set(command.name, command);
}

client.on("ready", () => {
	console.log(`logging in as ${client.user?.username}`);
});

client.on("message", (msg) => {
	if (!msg.cleanContent.startsWith(process.env.PREFIX!) || msg.author.bot)
		return;

	const args = msg.cleanContent
		.slice(process.env.PREFIX?.length)
		.split(/\r?\n| +/);
	const command: string = args.shift()?.toLowerCase() as string;
	if (!commands.has(command)) return;
	try {
		commands.get(command)!.execute(msg, args);
	} catch (err) {
		msg.channel.send("some error has happen");
		console.log(err);
	}
});

client.login(process.env.TOKEN);
