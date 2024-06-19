const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    masterUsersId: {type: mongoose.Types.ObjectId, ref: "MasterUsers", required: true},
    vehicleTypeId: {type: mongoose.Types.ObjectId, ref: "VehicleType", required: true},
    transmissionId: {type: mongoose.Types.ObjectId, ref: "Transmission", required: true},
    name: {type: String, required: true, maxLength: 255},
    description: {type: String, required: true, maxLength: 255},
    price: {type: Number, required: true},
    image: {type: String, required: true, maxLength: 255},
    yearManufacture: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Vehicle", vehicleSchema);