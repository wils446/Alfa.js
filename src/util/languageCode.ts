import { LanguageList } from "../interfaces/LanguageList";

module.exports = (language: string) => {
	const supportedLanguage: Array<LanguageList> = [
		{
			name: "java",
			alias: ["java"],
			versionIndex: "3",
		},
		{
			name: "nodejs",
			alias: ["javascript", "js"],
			versionIndex: "3",
		},
		{
			name: "python3",
			alias: ["python", "py"],
			versionIndex: "3",
		},
		{
			name: "php",
			alias: ["php"],
			versionIndex: "3",
		},
		{
			name: "c",
			alias: ["c"],
			versionIndex: "4",
		},
		{
			name: "go",
			alias: ["go", "golang"],
			versionIndex: "3",
		},
	];
	return supportedLanguage.find((lang) => lang.alias.includes(language));
};
