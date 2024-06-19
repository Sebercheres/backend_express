const express = require('express');

const router = express.Router();

const masterusersController = require('../controllers/masteruserscontroller');

// create routes
router.get('/', masterusersController.getMasterusers);
router.post('/', masterusersController.createMasteruser);

// update user
router.get('/:id', masterusersController.getMasteruserById);
router.put('/:id', masterusersController.updateMasteruser);

// delete user
router.delete('/:id', masterusersController.deleteMasteruser);

module.exports = router;