const express = require('express');

const router = express.Router();

const rentalController = require('../controllers/rentalcontroller');

// create routes
router.get('/', rentalController.getRentals);
router.post('/', rentalController.createRental);

// update user
router.get('/:id', rentalController.getRentalById);
router.put('/:id', rentalController.updateRental);

// delete user
router.delete('/:id', rentalController.deleteRental);

module.exports = router;