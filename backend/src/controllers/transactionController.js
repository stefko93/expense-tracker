/* eslint-disable no-unused-vars */
import Transaction from '../models/Transaction';

export const transactionController = {
  async getTransactions(req, res) {
    try {
      const transactions = await Transaction.find();

      return res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  },

  async addTransaction(req, res) {
    try {
      const transaction = await Transaction.create(req.body);

      return res.status(201).json({
        success: true,
        data: transaction,
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);

        return res.status(400).json({
          success: false,
          error: messages,
        });
      }
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  },

  async updateTransactionById(req, res) {
    try {
      const { amount, type, detail, payment, date } = req.body;
      const transaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        { amount, type, detail, payment, date },
        { new: true }
      );

      if (!transaction) {
        return res.status(404).json({
          success: false,
          error: 'No transaction found',
        });
      }
      return res.status(200).json({
        success: true,
        data: transaction,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  },

  async deleteTransaction(req, res) {
    try {
      const transaction = await Transaction.findById(req.params.id);

      if (!transaction) {
        return res.status(404).json({
          success: false,
          error: 'No transaction found',
        });
      }

      await transaction.remove();

      return res.status(200).json({
        success: true,
        data: {},
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  },
};
