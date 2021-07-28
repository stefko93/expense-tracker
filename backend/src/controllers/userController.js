import bcrypt from 'bcryptjs';
import { userService } from '../services';
import User from '../models/User';
import { validateLoginData, validateUserData } from '../utils';

export const userController = {
  async registerUser(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;

      const { error } = validateUserData(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const emailExist = await User.findOne({ email });
      if (emailExist)
        return res.status(400).send('This email has already been used.');

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await user.save();

      return res.status(201).json({
        success: true,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
    // const user = await userService.registerUser(req.body);
    // res.status(user.status).json({ user });
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const { error } = validateLoginData(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await User.findOne({ email });
      if (!user) return res.status(400).send('User does not exist');

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).send('Invalid password');

      const token = user.generateAuthToken();

      return res.status(201).json({
        success: true,
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }

    // const user = await userService.loginUser(req.body);
    // res.status(user.status).json({ user });
  },

  async logoutUser(req, res) {
    const user = await userService.loginUser(req.body);
    res.status(user.status).json({ user });
  },

  // async getUserById(req, res) {
  //   const { id } = req.params;
  //   const user = await userService.getUserById(id);
  //   res.status(user.status).json(user);
  // },

  async loadUser(req, res) {
    const user = await User.findById(req.user.id).select('-password');
    // return res.send(user);
    return res.status(200).json({
      success: true,
      user,
    });
  },

  async updateUser(req, res) {
    try {
      const { name, email } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, email },
        { new: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  },
};
