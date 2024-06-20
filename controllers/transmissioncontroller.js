const transmission = require('../models/transmission');
const asyncHandler = require('express-async-handler');

exports.getTransmissions = asyncHandler(async (req, res) => {
    const transmissions = await transmission.find();
    res.status(200).json(transmissions);
});

exports.createTransmission = asyncHandler(async (req, res) => {
    const transmission = await transmission.create(req.body);
    res.status(201).json(transmission);
});

exports.getTransmissionById = asyncHandler(async (req, res) => {
    const transmission = await transmission.findById(req.params.id);
    if (transmission) {
        res.status(200).json(transmission);
    } else {
        res.status(404);
        throw new Error('Transmission not found');
    }
});

exports.updateTransmission = asyncHandler(async (req, res) => {
    const transmission = await transmission.findById(req.params.id);
    if (transmission) {
        transmission.name = req.body.transmissionName || transmission.transmissionName;
        const updatedTransmission = await transmission.save();
        res.status(200).json(updatedTransmission);
    } else {
        res.status(404);
        throw new Error('Transmission not found');
    }
});

exports.deleteTransmission = asyncHandler(async (req, res) => {
    const transmission = await transmission.findById(req.params.id);
    if (transmission) {
        await transmission.remove();
        res.status(200).json({ message: 'Transmission removed' });
    } else {
        res.status(404);
        throw new Error('Transmission not found');
    }
});

