const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const masterUserSchema = new Schema({
    username: {type: String, required: true, maxLength: 255, unique: true},
    name: {type: String, required: true, maxLength:255},
    password: {type: String, required: true},
    email: {type: String, required: true, maxLength: 255, unique: true},
    address: {type: String, required: true, maxLength: 255},
    phoneNumber: {type: String, required: true, maxLength: 20},
    createdAt: {type: Date, default: Date.now},
    updatatedAt: {type: Date, default: Date.now},
    roleManagementId: {type: mongoose.Types.ObjectId, ref: "RoleManagement", required: true},
})


module.exports = mongoose.model("MasterUsers", masterUserSchema);