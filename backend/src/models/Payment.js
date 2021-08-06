import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  type: {
    type: String,
    trim: true,
    required: [true, 'Please add type'],
  },
  color: {
    type: String,
    trim: true,
    required: [true, 'Please add color'],
  },
});

export default mongoose.model('Payment', paymentSchema);
