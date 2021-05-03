const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

const moment = require("moment");

module.exports = class FetchUser extends Command {
    constructor() {
        super("fetchuser", {
            description: "Fetch a user outside the server.",
            channel: "guild",
            args: [
                {
                    id: "ID",
                    match: "content",
                    prompt: {
                        start: message => ":x: User id is not provided to fetch"
                    }
                }
            ],
            aliases: ["fetchuser"],
            cooldown: 10000,
            category: "Misc",
            clientPermissions: ["SEND_MESSAGES"]
        });
    };

    async exec(message, args) {

        const user = args.ID;

        this.client.users.fetch(args.ID).then(async x => {

            let isalt;

            if (Math.floor(Date.now() - x.createdAt) / 86400000 < 12) {
                isalt = "Yes";
            } else {
                isalt = "No";
            };

            let isbot;

            if (x.bot) {
                isbot = "Yes";
            } else {
                isbot = "No";
            };

            const fetched = new MessageEmbed()
                .setTitle(x.tag)
                .setDescription("User has been successfully fetched.")
                .setThumbnail(x.displayAvatarURL({ dynamic: true, size: 4096 }))
                .setColor("#74a9ec")
                .addFields(
                    {
                        name: "Is Alt?",
                        value: isalt,
                        inline: true
                    },
                    {
                        name: "Is Bot?",
                        value: isbot,
                        inline: true
                    },
                    {
                        name: "Avatar",
                        value: `[Link](${x.displayAvatarURL({ dynamic: true, size: 4096 })})`,
                        inline: true
                    },
                    {
                        name: "ID",
                        value: `\`${x.id}\``
                    },
                    {
                        name: "Account Created",
                        value: `\`${moment(x.createdAt).fromNow()}\``
                    }
                )
                .setFooter(`Req By ${message.author.username}`);
                
            return message.channel.send(fetched);
        }).catch(err => {
            message.channel.send(":x: An error occurred!");
        });
    };
};
