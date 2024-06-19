const express = require('express');

const router = express.Router();

const rolemanagementController = require('../controllers/rolemanagementcontroller');

// create routes
router.get('/', rolemanagementController.getRolemanagements);
router.post('/', rolemanagementController.createRolemanagement);

// update user
router.get('/:id', rolemanagementController.getRolemanagementById);
router.put('/:id', rolemanagementController.updateRolemanagement);

// delete user
router.delete('/:id', rolemanagementController.deleteRolemanagement);

module.exports = router;