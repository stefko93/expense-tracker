/* eslint-disable no-unused-vars */
import Payment from '../models/Payment';

export const paymentController = {
  async getPayments(req, res) {
    try {
      const payment = await Payment.find();

      return res.status(200).json({
        success: true,
        count: payment.length,
        data: payment,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  },

  async addPayment(req, res) {
    try {
      const { type, color } = req.body;

      const payment = await Payment.create(req.body);

      return res.status(201).json({
        success: true,
        data: payment,
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
