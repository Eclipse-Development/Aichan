const { Command } = require('discord-akairo');

module.exports = class Ping extends Command {
    constructor() {
        super('ping', {
            aliases: ["ping"],
            description: "Check the message ping of Aichan",
            channel: "guild",
            category: "Utils",
            clientPermissions: ["SEND_MESSAGES"]
        });
    };

    async exec(message) {

        const m = await message.channel.send("Ping"); 

        const ts = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp;

        const ping = `${Math.floor(m.createdTimestamp - ts)}`; 

        m.edit("Ping `" + ping + "ms`");
    };
};
