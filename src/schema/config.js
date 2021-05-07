const { Schema, model } = require("mongoose");

module.exports = model(
    "configuration",
    new Schema({
        _id: String,
        message: { type: String, default: null}
    }, {
        versionKey: false
    })
);
