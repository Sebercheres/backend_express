const express = require('express');

const router = express.Router();

const vehicleController = require('../controllers/vehiclecontroller');

// create routes
router.get('/', vehicleController.getVehicles);
router.post('/', vehicleController.createVehicle);

//update user
router.get('/:id', vehicleController.getVehicleById);
router.put('/:id', vehicleController.updateVehicle);

//delete user
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;