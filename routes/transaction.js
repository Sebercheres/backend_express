const express = require('express');

const router = express.Router();

const transactionController = require('../controllers/transactioncontroller');

// create routes
router.get('/', transactionController.getTransactions);
router.post('/', transactionController.createTransaction);

// update user  
router.get('/:id', transactionController.getTransactionById);
router.put('/:id', transactionController.updateTransaction);

// delete user
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;