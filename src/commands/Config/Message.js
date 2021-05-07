const { Command } = require("discord-akairo");
const config = require("../../schema/config");

module.exports = class LogMessage extends Command {
    constructor() {
        super("message", {
            description: "Setup a message log channel.",
            args: [
                {
                    id: "channel",
                    type: "textChannel",
                    prompt: {
                        start: message => ":x: You have to provide a channel",
                        retry: message => ":x: Couldn't get that channel"
                    },
                },
            ],
            aliases: ["message", "messagelog", "message-log"],
            channel: "guild",
            category: "Config"
        });
    };

    async userPermissions(message) {
        if (!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send(":x: You have to acquire `Manage_Guild` permission!")
        };
    };

    async exec(message, args) {

        const channel = args.channel;

        config.findOne({ _id: message.guild.id }, async (error, data) => {
            if (error) throw error;

            if (!data) {
                data = new config({ _id: message.guild.id, message: channel.id });
                message.channel.send("✅ Message channel has been set as <#" + channel.id + ">");
            } else {
                return data.updateOne({ _id: message.guild.id, message: channel }).then(() => {
                    message.channel.send("✅ Message channel has been set as <#" + channel.id + ">");
                });
            };
            data.save();
        });
    };
};
