const express = require('express');

const router = express.Router();

const vehicletypeController = require('../controllers/vehicletypecontroller');

// create routes
router.get('/', vehicletypeController.getVehicletypes);
router.post('/', vehicletypeController.createVehicletype);

// update user
router.get('/:id', vehicletypeController.getVehicletypeById);
router.put('/:id', vehicletypeController.updateVehicletype);

// delete user
router.delete('/:id', vehicletypeController.deleteVehicletype);

module.exports = router;