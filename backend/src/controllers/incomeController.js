import Income from '../models/Income';

export const incomeController = {
  async getIncomes(req, res) {
    try {
      const incomes = await Income.find();

      return res.status(200).json({
        success: true,
        count: incomes.length,
        data: incomes,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  },

  async addIncome(req, res) {
    try {
      const income = await Income.create(req.body);

      return res.status(201).json({
        success: true,
        data: income,
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
