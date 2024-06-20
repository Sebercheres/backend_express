require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const MasterUser = require('../models/masterusers'); // Adjust the path as necessary

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const createUser = async (userData) => {
    const newUser = new MasterUser(userData);
    await newUser.save();
    return newUser;
};

const findUserByUsername = async (username) => {
    return await MasterUser.findOne({ username });
};

const comparePassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.roleManagementId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.register = asyncHandler(async (req, res) => {
    const { username, name, password, email, address, phoneNumber, roleManagementId } = req.body;
    const hashedPassword = await hashPassword(password);
    await createUser({
        username,
        name,
        password: hashedPassword,
        email,
        address,
        phoneNumber,
        roleManagementId
    });
    res.status(201).json({ message: 'User registered successfully' });
});

exports.login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = generateToken(user);
    res.json({ token });
});

exports.verifyUserToken = asyncHandler(async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ message: 'Token is not valid' });
    }
});

exports.isUser = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role) {
        return next();
    }
    res.status(403).json({ message: 'Access denied. Users only.' });
});

exports.isAdmin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === 1) { // assuming roleManagementId 1 is for admin
        return next();
    }
    res.status(403).json({ message: 'Access denied. Admins only.' });
});

exports.getMasterusers = asyncHandler(async (req, res) => {
    const masterusers = await MasterUser.find();
    res.status(200).json(masterusers);
});

exports.getMasteruserById = asyncHandler(async (req, res) => {
    const masteruser = await MasterUser.findById(req.params.id);
    if (masteruser) {
        res.status(200).json(masteruser);
    } else {
        res.status(404);
        throw new Error("Masteruser not found");
    }
});

exports.updateMasteruser = asyncHandler(async (req, res) => {
    const masteruser = await MasterUser.findById(req.params.id);
    if (masteruser) {
        const { username, name, password, email, address, phoneNumber, roleManagementId } = req.body;

        masteruser.username = username || masteruser.username;
        masteruser.name = name || masteruser.name;
        masteruser.email = email || masteruser.email;
        masteruser.address = address || masteruser.address;
        masteruser.phoneNumber = phoneNumber || masteruser.phoneNumber;
        masteruser.roleManagementId = roleManagementId || masteruser.roleManagementId;

        if (password) {
            masteruser.password = await hashPassword(password);
        }

        const updatedMasteruser = await masteruser.save();
        res.status(200).json(updatedMasteruser);
    } else {
        res.status(404);
        throw new Error("Masteruser not found");
    }
});

exports.deleteMasteruser = asyncHandler(async (req, res) => {
    const masteruser = await MasterUser.findById(req.params.id);
    if (masteruser) {
        await masteruser.remove();
        res.status(200).json({ message: "Masteruser removed" });
    } else {
        res.status(404);
        throw new Error("Masteruser not found");
    }
});
