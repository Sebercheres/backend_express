const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    masterUsersId: {type: mongoose.Types.ObjectId, ref: "MasterUsers", required: true},
    vehicleId: {type: mongoose.Types.ObjectId, ref: "Vehicle", required: true},
    status: {type: String, required: true, maxLength: 255},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Rental", rentalSchema);