const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleTypeSchema = new Schema({
    vehicleName: {type: String, required: true, maxLength: 255},
    numberOfWheels: {type: Number, required: true},
});

module.exports = mongoose.model("VehicleType", vehicleTypeSchema);