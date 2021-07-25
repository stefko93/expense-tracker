/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { validateLoginData, validateUserData } from '../utils';

export const userService = {
  async registerUser(data) {
    try {
      const { error } = validateUserData(data);
      if (error) {
        return {
          status: 400,
          error: error.details[0].message,
        };
      }

      const emailExist = await User.findOne({ email: data.email }).exec();
      if (emailExist) {
        return {
          status: 400,
          error: 'Email address is already used',
        };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      const user = await new User({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
      });
      await user.save();

      return {
        status: 204,
        message: 'User created',
      };
    } catch (err) {
      return {
        status: 500,
        error: err,
      };
    }
  },

  async loginUser(data) {
    try {
      const { error } = validateLoginData(data);
      if (error) {
        return {
          status: 400,
          error: error.details[0].message,
        };
      }

      const user = await User.findOne({ email: data.email }).exec();
      if (!user) {
        return {
          status: 400,
          error: `We couldn't find any user with this email address`,
        };
      }

      const validPassword = await bcrypt.compare(data.password, user.password);
      if (!validPassword) {
        return {
          status: 400,
          error: 'Email or password is incorrect',
        };
      }

      const token = jwt.sign(
        {
          email: user.email,
          _id: user._id,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '1day',
        }
      );

      return {
        status: 200,
        user,
        token,
      };
    } catch (err) {
      return {
        status: 500,
        error: err,
      };
    }
  },

  async getUserById(id) {
    try {
      const singleUser = await User.findById({ _id: id });
      return {
        status: 200,
        user: singleUser,
      };
    } catch (err) {
      return {
        status: 500,
        error: err,
      };
    }
  },

  async updateUser(user, id) {
    try {
      const { error } = validateUserData(user);
      if (error) {
        return {
          status: 400,
          error: error.details[0].message,
        };
      }
      const updateResponse = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            // role: user.role
          },
        },
        { new: true }
      );
      return {
        status: 200,
        updatedUser: updateResponse,
      };
    } catch (err) {
      return {
        status: 500,
        error: err,
      };
    }
  },
};
