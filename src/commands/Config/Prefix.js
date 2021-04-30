const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../modules/config.json");
const config = require("../../schema/prefix");

module.exports = class Prefix extends Command {
    constructor() {
        super("prefix", {
            description: "Change prefix",
            args: [
                {
                    id: "prefix",
                    match: "restContent",
                    type: "string"
                }
            ],
            aliases: ["prefix"],
            channel: "guild",
            category: "Configuration",
            clientPermissions: ["SEND_MESSAGES"]
        });
    };

    async exec(message, args) {

        if (!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send(`**${message.author.username}** | You require Manage Server to change prefix!`)
        };

        const check = await config.findOne({ _id: message.guild.id });
        const pref = args.prefix;

        if (!pref) {
            return message.channel.send(
                new MessageEmbed()
                    .setDescription(":x: You have to provide a prefix!")
                    .setColor("#fa7070")
            );
        };

        if (pref.length > 8) {
            return message.channel.send(
                new MessageEmbed()
                    .setDescription(":x: You cannot set prefix more than 8 chars.")
                    .setColor("#fa7070")
            );
        };

        if (pref === prefix) {
            if (!check) {
                return message.channel.send(
                    new MessageEmbed()
                        .setDescription(`:x: That prefix is already set by default!`)
                        .setColor("#fa7070")
                );
            } else {
                return config.findOneAndDelete({ _id: message.guild.id }).then(() => {
                    message.channel.send(
                        new MessageEmbed()
                            .setDescription(`✅ Prefix has been reset.`)
                            .setColor("#fa7070")

                    );
                });
            };
        };

        config.findOne({ _id: message.guild.id }, async (err, data) => {
            if (err) throw err;

            if (!data) {
                data = new config({ _id: message.guild.id, prefix: pref });

            } else {
                return data.updateOne({
                    _id: message.guild.id,
                    prefix: pref
                })
            };

            data.save();
        });
        
        message.channel.send(`Prefix has been set to \`${pref}\``);

    };
};
