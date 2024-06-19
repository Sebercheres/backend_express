const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transmissionSchema = new Schema({
    transmissionName: {type: String, required: true, maxLength: 255},
});

module.exports = mongoose.model("Transmission", transmissionSchema);