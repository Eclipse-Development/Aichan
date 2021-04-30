const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

module.exports = class Uptime extends Command {
    constructor() {
        super("uptime", {
            aliases: ["uptime", "up"],
            description: "Check total uptime of Aichan",
            channel: "guild",
            category: "Utils",
            clientPermissions: ["SEND_MESSAGES"]
        });
    };

    async exec(message) {

        var d = Math.floor(this.client.uptime / 86400000);
        var h = Math.floor(this.client.uptime / 3600000) % 24;
        var m = Math.floor(this.client.uptime / 60000) % 60;
        var s = Math.floor(this.client.uptime / 1000) % 60;

        const output = `${d} days ${h} hours ${m} minutes ${s} seconds`;

        return message.channel.send(
            new MessageEmbed()
                .setTitle("Aichan")
                .setColor("#e46ea2")
                .addField("Uptime", `\`\`\`${output}\`\`\``)
        );
    };
};
