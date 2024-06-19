const vehicle = require('../models/vehicle');
const asyncHandler = require('express-async-handler');

exports.getVehicles = asyncHandler(async (req, res) => {
    const vehicles = await vehicle.find();
    res.status(200).json(vehicles);
});

exports.createVehicle = asyncHandler(async (req, res, next) => {
    const vehicle = await vehicle.create(req.body);
    res.status(201).json(vehicle);
});

exports.getVehicleById = asyncHandler(async (req, res) => {
    const vehicle = await vehicle.findById(req.params.id);
    if (vehicle) {
        res.status(200).json(vehicle);
    } else {
        res.status(404);
        throw new Error('Vehicle not found');
    }
});

exports.updateVehicle = asyncHandler(async (req, res) => {
    const vehicle = await vehicle.findById(req.params.id);
    if (vehicle) {
        vehicle.name = req.body.name || vehicle.name
        vehicle.brand = req.body.brand || vehicle.brand
        vehicle.model = req.body.model || vehicle.model
        vehicle.year = req.body.year || vehicle.year
        vehicle.color = req.body.color || vehicle.color
        vehicle.price = req.body.price || vehicle.price
        vehicle.transmission = req.body.transmission || vehicle.transmission
        vehicle.image = req.body.image || vehicle.image
        vehicle.status = req.body.status || vehicle.status
        const updatedVehicle = await vehicle.save();
        res.status(200).json(updatedVehicle);
    }
    else {
        res.status(404);
        throw new Error('Vehicle not found');
    }
});

exports.deleteVehicle = asyncHandler(async (req, res) => {
    const vehicle = await vehicle.findById(req.params.id);
    if (vehicle) {
        await vehicle.remove();
        res.status(200).json({ message: 'Vehicle removed' });
    } else {
        res.status(404);
        throw new Error('Vehicle not found');
    }
});
