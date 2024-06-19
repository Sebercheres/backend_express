const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    rentalId: {type: mongoose.Types.ObjectId, ref: "Rental", required: true},
    masterUsersId: {type: mongoose.Types.ObjectId, ref: "MasterUsers", required: true},
    total: {type: Number, required: true},
    transactionDate: {type: Date, default: Date.now},
    method: {type: String, required: true, maxLength: 255},
});

module.exports = mongoose.model("Transaction", transactionSchema);