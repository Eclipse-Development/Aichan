const { AkairoClient, ListenerHandler, CommandHandler } = require("discord-akairo");
const {
    token,
    prefix,
    developers
} = require("../modules/config.json");
const { connect } = require("../modules/mongoose");
const config = require("../schema/prefix");

module.exports = class Aichan extends AkairoClient {
    constructor() {
        super({
            ownerID: developers
        }, {
            disableMentions: "everyone",
            messageCacheMaxSize: 0
        });

        this.commandHandler = new CommandHandler(this, {
            prefix: async m => {
                const x = await config.findOne({ _id: m.guild.id});

                if (!x) {
                    return prefix;
                } else {
                    return x.prefix;
                };
            },
            blockClient: true,
            allowMention: true,
            defaultCooldown: 3000,
            commandUtil: true,
            blockBots: true,
            directory: "./src/commands/"
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: './src/listeners/'
        });

        this.config = require("../modules/config.json");
    };

    async start() {
        try {
            this.commandHandler.loadAll();
            this.listenerHandler.loadAll();
            this.login(token);
            connect();
        } catch (x) {
            console.log(x);
        };
    };
};
