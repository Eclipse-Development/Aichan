/**
 * Class Listener
 * {Listener}
 */
const { Listener } = require("discord-akairo");
/**
 * Schema Config
 * {config}
 */
const config = require("../../schema/config")
/**
 * Moment
 *{moment}
 */
const moment = require("moment");
/**
 * Class MessageEmbed
 * {MessageEmbed}
 */
const { MessageEmbed } = require("discord.js");

module.exports = class MessageDeleted extends Listener {
    constructor() {
        super("MessageDeleted", {
            event: "messageDelete",
            emitter: "client",
            category: "logs"
        });
    };

    async exec(message) {

        /**
         * If the author is bot it will return
         */
        if (message.author.bot) {
            return;
        };
        /**
         * If the author id is the client id it will return
         */
        if (message.author.id === this.client.user.id) {
            return;
        };
        /**
         * If the message channel is nsfw enabled it will return
         */
        if (message.channel.nsfw) {
            return;
        };
        /**
         * Using moment to get the timestamp in 24h format
         */
        const time = moment(Date.now()).format("HH:mm:ss");
        /**
         * Embed with the message content
         */
        const gotDel = new MessageEmbed().setDescription(message.content);

        /**
         * If the message contains attachment then it will add the field with a hyperlink
         */
        if (message.attachments.size > 0) {
            gotDel.addField("Attachment", `[Link](${message.attachments.first().url})`);
        };

        config.findOne({ _id: message.guild.id }, async (error, data) => {

            if (error) throw error;

            if (data) {
                /**
                 *  Cache and gets the channel
                 * @param {String} channel
                 */
                const channel = this.client.channels.cache.get(data.message);

                return channel.send(
                    `\`[${time}]\` Message sent by ${message.author.tag} (ID: ${message.author.id}) has been deleted in ${message.channel}`,
                    gotDel
                ).catch(x => {});
            };
        });
    };
};
