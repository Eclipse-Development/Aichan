const { Listener } = require("discord-akairo");
const afk = require("../../schema/afk");
const moment = require("moment");

module.exports = class Afk extends Listener {
    constructor() {
        super("message", {
            event: "message",
            emitter: "client",
            category: "server"
        });
    };

    async exec(message) {

        if (message.author.bot) {
            return;
        };

        if (message.mentions.members.first() === message.member) {
            const config = await afk.findOne({ _id: message.guild.id, user: message.author.id });

            if (!config) {
                return;
            } else {
                setTimeout(function () {
                    return afk.findOneAndDelete({ _id: message.guild.id, user: message.author.id }).then(() => {
                        message.reply(`**${message.author.username}** | Your afk has been removed!`).then(x => {
                            x.delete({ timeout: 5000 });
                        });;
                    });
                }, 1000);
            };
        };

        if (message.mentions.members.first()) {
            const config = await afk.findOne({ _id: message.guild.id, user: message.mentions.members.first().user.id });

            if (!config) {
                return;
            } else {
                const time = moment(config.time).fromNow();
                return message.channel.send(`${message.mentions.members.first().user.username} is AFK!\n\`${config.reason}\`\n- ${time}`);
            };
        };

        const config = await afk.findOne({ _id: message.guild.id, user: message.author.id });

        if (!config) {
            return
        } else {
            setTimeout(function () {

                return afk.findOneAndDelete({ _id: message.guild.id, user: message.author.id }).then(() => {
                    message.channel.send(`**${message.author.username}** | Your afk has been removed!`).then(x => {
                        x.delete({ timeout: 5000 });
                    });
                });
            }, 1000);
        };
    };
};
