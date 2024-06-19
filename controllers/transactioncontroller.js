const transaction = require('../models/transaction');
const asyncHandler = require('express-async-handler');

exports.getTransactions = asyncHandler(async (req, res) => {
    const transactions = await transaction.find({});
    res.status(200).json(transactions);
});

exports.createTransaction = asyncHandler(async (req, res) => {
    const transaction = await transaction.create(req.body);
    res.status(201).json(transaction);
});

exports.getTransactionById = asyncHandler(async (req, res) => {
    const transaction = await transaction.findById(req.params.id);
    if (transaction) {
        res.status(200).json(transaction);
    } else {
        res.status(404);
        throw new Error('Transaction not found');
    }
});

exports.updateTransaction = asyncHandler(async (req, res) => {
    const transaction = await transaction.findById(req.params.id);
    if (transaction) {
        transaction.vehicle = req.body.vehicle || transaction.vehicle;
        transaction.customer = req.body.customer || transaction.customer;
        transaction.startDate = req.body.startDate || transaction.startDate;
        transaction.endDate = req.body.endDate || transaction.endDate;
        transaction.totalPrice = req.body.totalPrice || transaction.totalPrice;
        transaction.status = req.body.status || transaction.status;
        const updatedTransaction = await transaction.save();
        res.status(200).json(updatedTransaction);
    } else {
        res.status(404);
        throw new Error('Transaction not found');
    }
});

exports.deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await transaction.findById(req.params.id);
    if (transaction) {
        await transaction.remove();
        res.status(200).json({ message: 'Transaction removed' });
    } else {
        res.status(404);
        throw new Error('Transaction not found');
    }
});
