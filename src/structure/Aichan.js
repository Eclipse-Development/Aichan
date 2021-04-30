const { AkairoClient, ListenerHandler, CommandHandler } = require("discord-akairo");
const {
    token,
    prefix,
    developers
} = require("../modules/config.json");

module.exports = class Aichan extends AkairoClient {
    constructor() {
        super({
            ownerID: developers
        }, {
            disableMentions: 'everyone'
        });

        this.commandHandler = new CommandHandler(this, {
            prefix: prefix,
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
    };

    async start() {
        try {
            this.commandHandler.loadAll();
            this.listenerHandler.loadAll();
            this.login(token);
        } catch (x) {
            console.log(x);
        };
    };
};