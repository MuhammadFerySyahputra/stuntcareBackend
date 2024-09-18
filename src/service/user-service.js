/* eslint-disable*/
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/user');
const ResponseError = require('../error/response-error');
const { validate } = require('../validation/validation');
const userValidation = require('../validation/user-validation');

const generateAccessToken = (user) => jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '15m' });

const generateRefreshToken = (user) => jwt.sign({ user }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });

const registerUser = async (userData) => {
  const validatedUserData = validate(userValidation.userValidationSchema, userData);

  const { username, email, password, role} = validatedUserData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await users.create({
    username,
    email,
    role,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async (email, password ) => {
  const userData = { email, password };
  const validatedUserData = validate(userValidation.userLoginValidationSchema, userData);

  const user = await users.findOne({ where: { email: validatedUserData.email } });
  
  if (!user) {
    throw new ResponseError(401, 'Email dan password tidak cocok');
  }

  const validPassword = await bcrypt.compare(validatedUserData.password, user.password);
  if (!validPassword) {
    throw new ResponseError(401, 'Email dan password tidak cocok');
  }

  const accessToken = generateAccessToken({ id: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user.id, role: user.role });

  await user.update({ refresh_token: refreshToken });

  return { accessToken, refreshToken, user };
};

const getUserById = async (userId) => {
  const validatedUserId = validate(userValidation.getUserByIdValidationSchema, userId);

  const user = await users.findByPk(validatedUserId);
  if (!user) {
    throw new ResponseError(404, 'Pengguna tidak ditemukan');
  }
  return user;
};

const updateUser = async (userId, updatedData) => {
  const user = await users.findByPk(userId);
  if (!user) {
    throw new ResponseError(404, 'Pengguna tidak ditemukan');
  }

  if (updatedData.role) {
    throw new ResponseError(400, 'Tidak diizinkan untuk mengubah peran pengguna');
  }

  const newData = { ...updatedData };

  if (newData.password) {
    newData.password = await bcrypt.hash(newData.password, 10);
  }

  await user.update(newData);
  return user;
};

const deleteUser = async (userId) => {
  const validatedUserId = validate(userValidation.getUserByIdValidationSchema, userId);

  const user = await users.findByPk(validatedUserId);
  if (!user) {
    throw new ResponseError(404, 'Pengguna tidak ditemukan');
  }

  await user.destroy();
};

const logoutUser = async (userId) => {
  const validatedUserId = validate(userValidation.getUserByIdValidationSchema, userId);

  const user = await users.findByPk(validatedUserId);
  if (!user) {
    throw new ResponseError(404, 'Pengguna tidak ditemukan');
  }

  user.refresh_token = null;
  await user.save();
};

const refreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    // eslint-disable-next-line max-len
    const user = await users.findOne({ where: { id: decoded.user.id, refresh_token: refreshToken } });
    if (!user) throw new Error('Invalid refresh token');

    const newAccessToken = generateAccessToken({ id: user.id, role: user.role });
    const newRefreshToken = generateRefreshToken({ id: user.id, role: user.role });

    await user.update({ refresh_token: newRefreshToken });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
  logoutUser,
  refreshToken,
};
