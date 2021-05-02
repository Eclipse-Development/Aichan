const { Listener } = require('discord-akairo');

module.exports = class ReadyListener extends Listener {
    constructor() {
        super("ready", {
            event: "ready",
            emitter: "client",
            category: "client"
        });
    };

    exec() {
        console.log(this.client.user.username + " is now online");
        this.client.user.setStatus("idle");
    };
};
