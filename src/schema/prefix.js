const { Schema, model } = require("mongoose");

module.exports = new model(
    "Prefix",
    new Schema({
        _id: String,
        prefix: { type: String, default: null}
    }, {
        versionKey: false
    })
);
