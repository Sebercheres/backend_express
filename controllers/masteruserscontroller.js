const masterUsers = require("../models/masterusers");
const asyncHandler = require("express-async-handler");

exports.getMasterusers = asyncHandler(async (req, res) => {
    const masterusers = await masterUsers.find();
    res.status(200).json(masterusers);
});

exports.createMasteruser = asyncHandler(async (req, res) => {
    const masteruser = await masterUsers.create(req.body); 
    res.status(201).json(masteruser);
});

exports.getMasteruserById = asyncHandler(async (req, res) => {
    const masteruser = await masterUsers.findById(req.params.id);
    if (masteruser) {
        res.status(200).json(masteruser);
    } else {
        res.status(404);
        throw new Error("Masteruser not found");
    }
});

exports.updateMasteruser = asyncHandler(async (req, res) => {
    const masteruser = await masterUsers.findById(req.params.id);
    if (masteruser) {
        masteruser.name = req.body.name || masteruser.name;
        masteruser.email = req.body.email || masteruser.email;
        masteruser.password = req.body.password || masteruser.password;
        masteruser.role = req.body.role || masteruser.role;
        const updatedMasteruser = await masteruser.save();
        res.status(200).json(updatedMasteruser);
    } else {
        res.status(404);
        throw new Error("Masteruser not found");
    }
});

exports.deleteMasteruser = asyncHandler(async (req, res) => {
    const masteruser = await masterUsers.findById(req.params.id);
    if (masteruser) {
        await masteruser.remove();
        res.status(200).json({ message: "Masteruser removed" });
    } else {
        res.status(404);
        throw new Error("Masteruser not found");
    }
});