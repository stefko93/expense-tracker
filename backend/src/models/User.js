/* eslint-disable func-names */
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      email: this.email,
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '1day',
    }
  );
  return token;
};

export default mongoose.model('User', userSchema);
