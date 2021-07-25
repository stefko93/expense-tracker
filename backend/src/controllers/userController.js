import { userService } from '../services';

export const userController = {
  async registerUser(req, res) {
    const user = await userService.registerUser(req.body);
    res.status(user.status).json(user);
  },

  async loginUser(req, res) {
    const user = await userService.loginUser(req.body);
    res.status(user.status).json({ user });
  },

  async logoutUser(req, res) {
    const user = await userService.loginUser(req.body);
    res.status(user.status).json({ user });
  },

  async getUserById(req, res) {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(user.status).json(user);
  },

  async loadUser(req, res) {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(user.status).json(user);
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const userData = req.body;
    const user = {};
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.email = userData.email;
    user.password = userData.password;
    const updatedUser = await userService.updateUser(user, id);
    res.status(updatedUser.status).json(updatedUser);
  },
};
