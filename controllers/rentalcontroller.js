const Rental = require('../models/rental');
const asyncHandler = require('express-async-handler');

// Get all rentals for the logged-in user
exports.getRentals = asyncHandler(async (req, res) => {
    const rentals = await Rental.find({ masterUsersId: req.user.id }).populate('Vehicle', 'VehicleId');
    res.status(200).json(rentals);
});

// Create a new rental
exports.createRental = asyncHandler(async (req, res) => {
    const rentalData = {
        ...req.body,
        masterUsersId: req.user.id
    };
    const rental = await Rental.create(rentalData);
    res.status(201).json(rental);
});

// Get a rental by ID for the logged-in user
exports.getRentalById = asyncHandler(async (req, res) => {
    const rental = await Rental.findOne({ _id: req.params.id, masterUsersId: req.user.id });
    if (rental) {
        res.status(200).json(rental);
    } else {
        res.status(404);
        throw new Error('Rental not found');
    }
});

// Update a rental by ID for the logged-in user
exports.updateRental = asyncHandler(async (req, res) => {
    const rental = await Rental.findOne({ _id: req.params.id, masterUsersId: req.user.id });
    if (rental) {
        rental.vehicleId = req.body.VehicleId || rental.VehicleId;
        rental.status = req.body.Status || rental.Status;
        const updatedRental = await rental.save();
        res.status(200).json(updatedRental);
    } else {
        res.status(404);
        throw new Error('Rental not found');
    }
});

// Delete a rental by ID for the logged-in user
exports.deleteRental = asyncHandler(async (req, res) => {
    const rental = await Rental.findOne({ _id: req.params.id, MasterUserId: req.user.id });
    if (rental) {
        await rental.remove();
        res.status(200).json({ message: 'Rental removed' });
    } else {
        res.status(404);
        throw new Error('Rental not found');
    }
});
