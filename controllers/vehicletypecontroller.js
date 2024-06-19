const vehicletype = require('../models/vehicletype');
const asyncHandler = require('express-async-handler');

exports.getVehicletypes = asyncHandler(async (req, res) => {
    const vehicletypes = await vehicletype.find();
    res.status(200).json(vehicletypes);
});

exports.createVehicletype = asyncHandler(async (req, res) => {
    const vehicletype = await vehicletype.create(req.body);
    res.status(201).json(vehicletype);
});

exports.getVehicletypeById = asyncHandler(async (req, res) => {
    const vehicletype = await vehicletype.findById(req.params.id);
    if (vehicletype) {
        res.status(200).json(vehicletype);
    } else {
        res.status(404);
        throw new Error('Vehicletype not found');
    }
});

exports.updateVehicletype = asyncHandler(async (req, res) => {
    const vehicletype = await vehicletype.findById(req.params.id);
    if (vehicletype) {
        vehicletype.name = req.body.name || vehicletype.name;
        const updatedVehicletype = await vehicletype.save();
        res.status(200).json(updatedVehicletype);
    } else {
        res.status(404);
        throw new Error('Vehicletype not found');
    }
});

exports.deleteVehicletype = asyncHandler(async (req, res) => {
    const vehicletype = await vehicletype.findById(req.params.id);
    if (vehicletype) {
        await vehicletype.remove();
        res.status(200).json({ message: 'Vehicletype removed' });
    } else {
        res.status(404);
        throw new Error('Vehicletype not found');
    }
});
