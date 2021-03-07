import dotenv from "dotenv";
import axios from "axios";
import { Command } from "../interfaces/Command";
import { LanguageList } from "../interfaces/LanguageList";
const languageCode = require("../util/languageCode");

dotenv.config({ path: "../.env" });

const command: Command = {
	name: "exec",
	description: "to exec the code",
	execute: async (msg, args) => {
		console.log("ok");

		const message = msg.cleanContent
			.replace(`${process.env.PREFIX}exec`, "")
			.replace(/```/g, "")
			.trim();

		const language: LanguageList = languageCode(
			message.split("\n")[0].toLowerCase()
		);

		if (!language) {
			msg.channel.send("Sorry, the language is not supported");
			return;
		}

		const script = message.replace(
			new RegExp(language.alias.join("|"), "g"),
			""
		);

		const program = {
			script: script,
			language: language.name,
			versionIndex: language.versionIndex,
			clientId: process.env.JDOODLE_CLIENTID,
			clientSecret: process.env.JDOODLE_SECRET,
		};

		const response = await axios.post(
			"https://api.jdoodle.com/v1/execute",
			program
		);
		msg.channel.send(
			`${response.data.output}\nexecution time :\`${response.data.cpuTime}\`ms`
		);
	},
};

module.exports = command;
