const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleManagementSchema = new Schema({
    name: {type: String, required: true, maxLength: 255},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model("RoleManagement", roleManagementSchema);