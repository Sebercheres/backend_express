const rental = require('../models/rental');
const asyncHandler = require('express-async-handler');

exports.getRentals = asyncHandler(async (req, res) => {
    const rentals = await rental.find();
    res.status(200).json(rentals);
});

exports.createRental = asyncHandler(async (req, res) => {
    const rental = await rental.create(req.body);
    res.status(201).json(rental);
});

exports.getRentalById = asyncHandler(async (req, res) => {
    const rental = await rental.findById(req.params.id);
    if (rental) {
        res.status(200).json(rental);
    } else {
        res.status(404);
        throw new Error('Rental not found');
    }
});

exports.updateRental = asyncHandler(async (req, res) => {
    const rental = await rental.findById(req.params.id);
    if (rental) {
        rental.vehicle = req.body.vehicle || rental.vehicle;
        rental.customer = req.body.customer || rental.customer;
        rental.startDate = req.body.startDate || rental.startDate;
        rental.endDate = req.body.endDate || rental.endDate;
        rental.totalPrice = req.body.totalPrice || rental.totalPrice;
        rental.status = req.body.status || rental.status;
        const updatedRental = await rental.save();
        res.status(200).json(updatedRental);
    } else {
        res.status(404);
        throw new Error('Rental not found');
    }
});

exports.deleteRental = asyncHandler(async (req, res) => {
    const rental = await rental.findById(req.params.id);
    if (rental) {
        await rental.remove();
        res.status(200).json({ message: 'Rental removed' });
    } else {
        res.status(404);
        throw new Error('Rental not found');
    }
});


