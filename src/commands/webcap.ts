import captureWebsite from "capture-website";
import fs from "fs";
import { Command } from "../interfaces/Command";

const command: Command = {
	name: "webcap",
	description: "to take a screenshoot from a web",
	execute: async (msg, args) => {
		let URL: string = args[0];
		const path = "./img/screenshoot.png";
		const width: number = parseInt(args[1]) || 1280;
		const height: number = parseInt(args[2]) || 720;

		if (!URL.startsWith("http")) URL = `https://${URL}`;

		await captureWebsite.file(URL, path, {
			inputType: "url",
			width,
			height,
		});
		await msg.channel.send({ files: [path] });
		fs.unlinkSync(path);
	},
};

module.exports = command;
