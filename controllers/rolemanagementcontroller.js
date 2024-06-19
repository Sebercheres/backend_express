const roleMangement = require('../models/rolemanagement');
const asyncHandler = require('express-async-handler');

exports.getRolemanagements = asyncHandler(async (req, res) => {
    const roles = await roleMangement.find();
    res.status(200).json(roles);
});

exports.createRolemanagement = asyncHandler(async (req, res) => {
    const role = await roleMangement.create(req.body);
    res.status(201).json(role);
});

exports.getRolemanagementById = asyncHandler(async (req, res) => {
    const role = await roleMangement.findById(req.params.id);
    if (role) {
        res.status(200).json(role);
    } else {
        res.status(404);
        throw new Error('Role not found');
    }
});

exports.updateRolemanagement = asyncHandler(async (req, res) => {
    const role = await roleMangement.findById(req.params.id);
    if (role) {
        role.name = req.body.name || role.name;
        role.description = req.body.description || role.description;
        const updatedRole = await role.save();
        res.status(200).json(updatedRole);
    } else {
        res.status(404);
        throw new Error('Role not found');
    }
});

exports.deleteRolemanagement = asyncHandler(async (req, res) => {
    const role = await roleMangement.findById(req.params.id);
    if (role) {
        await role.remove();
        res.status(200).json({ message: 'Role removed' });
    } else {
        res.status(404);
        throw new Error('Role not found');
    }
});
