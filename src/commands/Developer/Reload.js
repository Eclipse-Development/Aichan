const { Command } = require("discord-akairo");

module.exports = class Reload extends Command {
    constructor() {
        super("reload", {
            description: "Reload all or a selected command",
            aliases: ["reload"],
            args: [
                {
                    id: "command"
                }
            ],
            category: "Developer",
            ownerOnly: true
        })
    };

    async exec(message, args) {

        const command = args.command;

        if (!command) {
            return message.channel.send(":x: You have to provide a command id");
        };

        if (command.toLowerCase() === "all") {
            message.channel.send("🔍 Reloading every commands").then(async x => {
                this.handler.reloadAll();
                setTimeout(function () {
                    x.edit("✅ All commands has been reloaded");
                }, 4000);
            });
        } else {
            try {
                this.handler.reload(command);

                const m = await message.channel.send(`🔍 Reloading \`${command}\` command`);

                setTimeout(function () {
                    m.delete();
                    message.channel.send(`✅ \`${command}\` command has been reloaded`)
                }, 2000);

            } catch (x) {
                message.channel.send(`:x: Command doesn't exist - \`${command}\``);
            };
        };
    };
};
