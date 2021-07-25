import Expense from '../models/Expense';

export const expenseController = {
  async getExpenses(req, res) {
    try {
      const expenses = await Expense.find();

      return res.status(200).json({
        success: true,
        count: expenses.length,
        data: expenses,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  },

  async addExpense(req, res) {
    try {
      const expense = await Expense.create(req.body);

      return res.status(201).json({
        success: true,
        data: expense,
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
};
