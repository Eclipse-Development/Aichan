const mongoose = require("mongoose");
const { mongoDB } = require("./config.json");

module.exports = {
    connect: () => {
        mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });

        mongoose.connection.on("disconnected", () => {
            console.log("Disconnected from MongoDB");
        });
    },
};
