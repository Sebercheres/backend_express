const express = require('express');
const router = express.Router();

const master_user_controller = require("../controllers/masteruserscontroller");
const rental_controller = require("../controllers/rentalcontroller");
const role_management_controller = require("../controllers/rolemanagementcontroller");
const transaction_controller = require("../controllers/transactioncontroller");
const transmission_controller = require("../controllers/transmissioncontroller");
const vehicle_controller = require("../controllers/vehiclecontroller");
const vehicle_type_controller = require("../controllers/vehicletypecontroller");

// Admin only authorization
router.get("/users", master_user_controller.verifyUserToken, master_user_controller.isAdmin, master_user_controller.getMasterusers);
router.delete("/users/:id", master_user_controller.verifyUserToken, master_user_controller.isAdmin, master_user_controller.deleteMasteruser);

router.post("/rolemanagement", master_user_controller.verifyUserToken, master_user_controller.isAdmin, role_management_controller.createRolemanagement);
router.post("/transmission", master_user_controller.verifyUserToken, master_user_controller.isAdmin, transmission_controller.createTransmission);
router.post("/vehicletype", master_user_controller.verifyUserToken, master_user_controller.isAdmin, vehicle_type_controller.createVehicletype);

router.put("/rolemanagement/:id", master_user_controller.verifyUserToken, master_user_controller.isAdmin, role_management_controller.updateRolemanagement);
router.put("/transmission/:id", master_user_controller.verifyUserToken, master_user_controller.isAdmin, transmission_controller.updateTransmission);
router.put("/vehicletype/:id", master_user_controller.verifyUserToken, master_user_controller.isAdmin, vehicle_type_controller.updateVehicletype);

router.delete("/rolemanagement/:id", master_user_controller.verifyUserToken, master_user_controller.isAdmin, role_management_controller.deleteRolemanagement);
router.delete("/transmission/:id", master_user_controller.verifyUserToken, master_user_controller.isAdmin, transmission_controller.deleteTransmission);
router.delete("/vehicletype/:id", master_user_controller.verifyUserToken, master_user_controller.isAdmin, vehicle_type_controller.deleteVehicletype);

// User authorization
router.get("/user/:id", master_user_controller.verifyUserToken, master_user_controller.isUser, master_user_controller.getMasteruserById);
router.put("/user/:id", master_user_controller.verifyUserToken, master_user_controller.isUser, master_user_controller.updateMasteruser);

// View
router.get("/transaction", master_user_controller.verifyUserToken, master_user_controller.isUser, transaction_controller.getTransactions);
router.get("/rental", master_user_controller.verifyUserToken, master_user_controller.isUser, rental_controller.getRentals);
router.get("/vehicle", master_user_controller.verifyUserToken, master_user_controller.isUser, vehicle_controller.getVehicles);
router.get("/rolemanagement", master_user_controller.verifyUserToken, master_user_controller.isUser, role_management_controller.getRolemanagements);
router.get("/transmission", master_user_controller.verifyUserToken, master_user_controller.isUser, transmission_controller.getTransmissions);
router.get("/vehicletype", master_user_controller.verifyUserToken, master_user_controller.isUser, vehicle_type_controller.getVehicletypes);

// Detail view
router.get("/transaction/:id", master_user_controller.verifyUserToken, master_user_controller.isUser, transaction_controller.getTransactionById);
router.get("/rental/:id", master_user_controller.verifyUserToken, master_user_controller.isUser, rental_controller.getRentalById);
router.get("/vehicle/:id", master_user_controller.verifyUserToken, master_user_controller.isUser, vehicle_controller.getVehicleById);
router.get("/rolemanagement/:id", master_user_controller.verifyUserToken, master_user_controller.isUser, role_management_controller.getRolemanagementById);
router.get("/transmission/:id", master_user_controller.verifyUserToken, master_user_controller.isUser, transmission_controller.getTransmissionById);
router.get("/vehicletype/:id", master_user_controller.verifyUserToken, master_user_controller.isUser, vehicle_type_controller.getVehicletypeById);

// Create
router.post("/transaction", master_user_controller.verifyUserToken, master_user_controller.isUser, transaction_controller.createTransaction);
router.post("/rental", master_user_controller.verifyUserToken, master_user_controller.isUser, rental_controller.createRental);
router.post("/vehicle", master_user_controller.verifyUserToken, master_user_controller.isUser, vehicle_controller.createVehicle);

// Update
router.put("/transaction/:id", master_user_controller.verifyUserToken, master_user_controller.isUser, transaction_controller.updateTransaction);
router.put("/rental/:id", master_user_controller.verifyUserToken, master_user_controller.isUser, rental_controller.updateRental);
router.put("/vehicle/:id", master_user_controller.verifyUserToken, master_user_controller.isUser, vehicle_controller.updateVehicle);

// Delete
router.delete("/transaction/:id", master_user_controller.verifyUserToken, master_user_controller.isUser, transaction_controller.deleteTransaction);
router.delete("/rental/:id", master_user_controller.verifyUserToken, master_user_controller.isUser, rental_controller.deleteRental);
router.delete("/vehicle/:id", master_user_controller.verifyUserToken, master_user_controller.isUser, vehicle_controller.deleteVehicle);

module.exports = router;
