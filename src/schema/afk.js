const { Schema, model } = require("mongoose");

module.exports = model(
    "afk",
    new Schema({
        _id: String,
        user: { type: String, default: null},
        reason: { type: String, default: null},
        time: Date
    }, {
        versionKey: false
    })
);
