import captureWebsite from "capture-website";
import dotenv from "dotenv";
import fs from "fs";
import { Command } from "../interfaces/Command";
dotenv.config({ path: "../.env" });

const command: Command = {
	name: "html",
	description: "to exec html file",
	execute: async (msg, args) => {
		const path = "./img/screenshoot.png";
		const width: number = parseInt(args[0]) || 1280;
		const height: number = parseInt(args[1]) || 720;

		const code = msg.cleanContent
			.replace(`${process.env.PREFIX}html`, "")
			.replace(`${width} ${height}`, "")
			.replace(/```/g, "")
			.replace("html", "")
			.trim();

		await captureWebsite.file(code, path, {
			inputType: "html",
			width,
			height,
		});
		await msg.channel.send({ files: [path] });
		fs.unlinkSync(path);
	},
};

module.exports = command;
