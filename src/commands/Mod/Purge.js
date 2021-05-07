const { Command } = require("discord-akairo");


module.exports = class Purge extends Command {
    constructor() {
        super("purge", {
            description: "Purge messages between 1-100",
            args: [
                {
                    id: "amount",
                    type: "number",
                    prompt: {
                        start: message => ":x: You have to provide a amount between 1 - 100",
                        retry: message => ":x: Purge amount can only be number!"
                    }
                }
            ],
            aliases: ["purge", "clear"],
            channel: "guild",
            category: "Mod"
        })
    };

    async clientPermissions(message) {
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send(":x: Aichan need `Manage_Messages` permission!");
        };
    };

    async userPermissions(message) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send(":x: You have to acquire `Manage_Messages` permission!");
        };
    };

    async exec(message, args) {

        const amount = args.amount;

        if (amount > 100) {
            return message.channel.send(":x: You cannot purge more than 100 messages");
        };

        let Del;

        if (amount === 100) {
            Del = 100;
        } else {
            if (amount === 99) {
                Del = 99;
            } else {
                Del = amount + 1;
            };
        };

        let output;

        if (Del === 99) {
            output = 100 - 1;
        } else {
            if (Del === 100) {
                output = 101 - 1;
            } else {
                output = Del - 1
            };
        };

        message.channel.bulkDelete(Del).then(() => {
            message.channel.send(
                {
                    embed: {
                        description: output + " Messages has been purged ✅",
                        color: "RED"
                    }
                }
            ).then(x => {
                x.delete({ timeout: 4000 })
            });
        }).catch(err => {
            message.channel.send(":x: An error occurred")
        })
    };
};
