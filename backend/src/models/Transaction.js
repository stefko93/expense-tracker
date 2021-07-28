import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    trim: true,
    required: [true, 'Please choose'],
  },
  category: {
    type: String,
    trim: true,
    required: [true, 'Please choose category'],
  },
  detail: {
    type: String,
    trim: true,
    required: [true, 'Please add detail'],
  },
  amount: {
    type: Number,
    required: [true, 'Please add a number'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Transaction', transactionSchema);
