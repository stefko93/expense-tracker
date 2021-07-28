import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  type: {
    type: String,
    trim: true,
    required: [true, 'Please add type'],
  },
  amount: {
    type: Number,
    required: [true, 'Please add a number'],
  },
  color: {
    type: String,
    trim: true,
    required: [true, 'Please add color'],
  },
});

export default mongoose.model('Income', incomeSchema);
