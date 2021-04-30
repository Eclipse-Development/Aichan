const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");


module.exports = class Invite extends Command {
    constructor() {
        super("invite", {
            description: "Invite Aichan to your server.",
            aliases: ["invite"],
            channel: "guild",
            category: "Utils",
            clientPermissions: "SEND_MESSAGES"
        });
    };

    async exec(message) {

        return message.channel.send(
            new MessageEmbed()
            .setTitle("Invite")
            .setColor("#7091fa")
            .addField("Link", `[Click Here](${this.client.config.invite})`)
        );
    };
};
