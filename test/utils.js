const bcrypt = require('bcrypt');
const User = require('../src/models/user');
// const sequelize = require('../src/config/database');

const createUser = async () => {
  const username = 'user';
  const email = 'user@gmail.com';
  const password = 'user123';
  const role = 'user';

  const hashedPassword = await bcrypt.hash(password, 10);
  const userRole = role || 'user';

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role: userRole,
  });
  return user;
};

const deleteUser = async () => {
  await User.destroy({
    where: {
      username: 'user',
    },
  });
};

module.exports = { createUser, deleteUser };
