const { Command } = require("discord-akairo");


module.exports = class MemberCount extends Command {
    constructor() {
        super("membercount", {
            description: "Get the total member count of the server excluding bots.",
            channel: "guild",
            aliases: ["membercount", "members"],
            cooldown: 10000,
            category: "Misc",
            clientPermissions: ["SEND_MESSAGES"]
        });
    };

    async exec(message) {

        const members = message.guild.members.cache.filter(x => !x.user.bot).size;

        message.channel.send(`This server has \`${members}\` members`);
    };
};
