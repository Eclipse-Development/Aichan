const { Command } = require("discord-akairo");
const afk = require("../../schema/afk");

module.exports = class AFK extends Command {
    constructor() {
        super("afk", {
            description: "Set a afk status. It will be displayed when you are mentioned.",
            channel: "guild",
            args: [
                {
                    id: "reason",
                    match: "content"
                }
            ],
            aliases: ["afk"],
            clientPermissions: ["SEND_MESSAGES"],
            category: "Misc",
            cooldown: 5000
        });
    };

    async exec(message, args) {
        
        let reason = args.reason;

        if (!reason) {
            reason = "Not Provided";
        };

        const config = await afk.findOne({ _id: message.guild.id, user: message.author.id});

        if (config) {
            return;
        };

        if (reason.length > 240) {
            return message.channel.send(":x: Text cannot be more than 240 chars.")
        };

        const a = new afk({ _id: message.guild.id, user: message.author.id, reason: reason, time: Date.now()});

        return a.save().then(() => {
            message.channel.send(`You are now on afk - \`${reason}\``);
        });
    };
};
