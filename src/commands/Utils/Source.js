const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

module.exports = class Source extends Command {
    constructor() {
        super("source", {
            aliases: ["source"],
            channel: "guild",
            category: "Utils",
            description: "Link to the source of Aichan.",
            clientPermissions: ["SEND_MESSAGES"]
        });
    };

    exec(message) {

        return message.channel.send(
            new MessageEmbed()
                .setTitle("Source")
                .setColor("#e46ea2")
                .addField("Link", `[Click Here](${this.client.config.source})`)
        );
    };
};
