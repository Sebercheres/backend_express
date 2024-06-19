const express = require('express');

const router = express.Router();

const transmissionController = require('../controllers/transmissioncontroller');

// create routes
router.get('/', transmissionController.getTransmissions);
router.post('/', transmissionController.createTransmission);

// update user
router.get('/:id', transmissionController.getTransmissionById);
router.put('/:id', transmissionController.updateTransmission);

// delete user
router.delete('/:id', transmissionController.deleteTransmission);

module.exports = router;
