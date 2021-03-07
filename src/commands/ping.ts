import { Command } from "../interfaces/Command";

const command: Command = {
	name: "ping",
	description: "to check your ping",
	execute: async (msg, args) => {
		msg.channel.send("pong");
	},
};

module.exports = command;
