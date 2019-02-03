const User = require('./userController');

class UserController {
  constructor() {
    if (typeof UserController._instance === 'object') {
      return UserController._instance;
    }

    UserController._instance = this;
  }

  static getInstance() {
    return new UserController();
  }

  async getAll() {
    return await User.find();
  }

  async getById(id) {
    return await User.findById(id);
  }

  async getByUsername(username) {
    return await User.findOne({ username });
  }

  async add(user) {
    await User.create([user]);
  }

  async update(id, newUser) {
    await User.findByIdAndUpdate(id, newUser);
  }

  async delete(id) {
    await User.findByIdAndDelete(id);
  }

  async deleteAll() {
    await User.deleteMany();
  }
}

module.exports = UserController.getInstance();
