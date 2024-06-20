// routes/auth.js
const express = require('express');
const router = express.Router();

const masteruserscontroller = require("../controllers/masteruserscontroller")

// Register route
router.post('/register', masteruserscontroller.register);

// Login route
router.post('/login', masteruserscontroller.login);


module.exports = router;