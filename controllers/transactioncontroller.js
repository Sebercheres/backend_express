const Transaction = require('../models/transaction');
const asyncHandler = require('express-async-handler');

// Get all transactions for the logged-in user
exports.getTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ masterUsersId: req.user.id });
    res.status(200).json(transactions);
});

// Create a new transaction
exports.createTransaction = asyncHandler(async (req, res) => {
    const transactionData = {
        ...req.body,
        masterUsersId: req.user.id
    };
    const transaction = await Transaction.create(transactionData);
    res.status(201).json(transaction);
});

// Get a transaction by ID for the logged-in user
exports.getTransactionById = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findOne({ _id: req.params.id, masterUsersId: req.user.id });
    if (transaction) {
        res.status(200).json(transaction);
    } else {
        res.status(404);
        throw new Error('Transaction not found');
    }
});

// Update a transaction by ID for the logged-in user
exports.updateTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findOne({ _id: req.params.id, masterUsersId: req.user.id });
    if (transaction) {
        transaction.rentalId = req.body.rentalId || transaction.rentalId;
        transaction.total = req.body.total || transaction.total;
        transaction.transactionDate = req.body.transactionDate || transaction.transactionDate;
        transaction.method = req.body.method || transaction.method;
        const updatedTransaction = await transaction.save();
        res.status(200).json(updatedTransaction);
    } else {
        res.status(404);
        throw new Error('Transaction not found');
    }
});

// Delete a transaction by ID for the logged-in user
exports.deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findOne({ _id: req.params.id, masterUsersId: req.user.id });
    if (transaction) {
        await transaction.remove();
        res.status(200).json({ message: 'Transaction removed' });
    } else {
        res.status(404);
        throw new Error('Transaction not found');
    }
});
