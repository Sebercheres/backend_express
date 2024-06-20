const Vehicle = require('../models/vehicle');
const asyncHandler = require('express-async-handler');

// Get all vehicles for the logged-in user
exports.getVehicles = asyncHandler(async (req, res) => {
    const vehicles = await Vehicle.find({ masterUsersId: req.user.id });
    res.status(200).json(vehicles);
});

// Create a new vehicle
exports.createVehicle = asyncHandler(async (req, res) => {
    const vehicleData = {
        ...req.body,
        masterUsersId: req.user.id
    };
    const vehicle = await Vehicle.create(vehicleData);
    res.status(201).json(vehicle);
});

// Get a vehicle by ID for the logged-in user
exports.getVehicleById = asyncHandler(async (req, res) => {
    const vehicle = await Vehicle.findOne({ _id: req.params.id, masterUserId: req.user.id });
    if (vehicle) {
        res.status(200).json(vehicle);
    } else {
        res.status(404);
        throw new Error('Vehicle not found');
    }
});

// Update a vehicle by ID for the logged-in user
exports.updateVehicle = asyncHandler(async (req, res) => {
    const vehicle = await Vehicle.findOne({ _id: req.params.id, masterUserId: req.user.id });
    if (vehicle) {
        vehicle.vehicleTypeId = req.body.vehicleTypeId || vehicle.vehicleTypeId;
        vehicle.transmissionId = req.body.transmissionId || vehicle.transmissionId;
        vehicle.name = req.body.name || vehicle.name;
        vehicle.description = req.body.description || vehicle.description;
        vehicle.price = req.body.price || vehicle.price;
        vehicle.image = req.body.image || vehicle.image;
        vehicle.yearManufacture = req.body.yearManufacture || vehicle.yearManufacture;
        const updatedVehicle = await vehicle.save();
        res.status(200).json(updatedVehicle);
    } else {
        res.status(404);
        throw new Error('Vehicle not found');
    }
});

// Delete a vehicle by ID for the logged-in user
exports.deleteVehicle = asyncHandler(async (req, res) => {
    const vehicle = await Vehicle.findOne({ _id: req.params.id, masterUserId: req.user.id });
    if (vehicle) {
        await vehicle.remove();
        res.status(200).json({ message: 'Vehicle removed' });
    } else {
        res.status(404);
        throw new Error('Vehicle not found');
    }
});
