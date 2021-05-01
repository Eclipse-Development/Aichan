const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

module.exports = class MemberCount extends Command {
    constructor() {
        super("avatar", {
            description: "Get your or a user's avatar.",
            channel: "guild",
            args: [
                {
                    id: "member",
                    type: "member",
                    default: message => message.member
                }
            ],
            aliases: ["avatar", "av"],
            cooldown: 5000,
            category: "Misc",
            clientPermissions: ["SEND_MESSAGES"]
        });
    };

    async exec(message, args) {

        const member = args.member;

        const avatar = new MessageEmbed()
            .setTitle(member.user.username + "'s Avatar")
            .setColor("#7091fa")
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }));

        if (member !== message.member) {
            avatar.setFooter(`Req by ${message.author.username}`);
        };

        message.channel.send(avatar);
    };
};
