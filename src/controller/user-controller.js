/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const userService = require('../service/user-service');

const app = express();
app.use(bodyParser.json());

const registerUser = async (req, res, next) => {
  try {
    const {
      username, email, password, role,
    } = req.body;
    console.log("Role from request body:", role);
    const user = await userService.registerUser({
      username, email, password, role,
    });
    res.status(201).json({ message: 'Berhasil mendaftar', data: user });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const { accessToken, refreshToken, user } = await userService.loginUser(email, password, role);
    res.status(200).json({ message: 'Berhasil login', data: { accessToken, refreshToken, user } });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    res.status(200).json({ message: 'Berhasil mendapatkan detail user', data: user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userService.updateUser(userId, req.body);
    res.status(200).json({ message: 'Berhasil Mengubah User', data: user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await userService.deleteUser(userId);
    res.status(200).json({ message: 'Berhasil Menghapus User' });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    await userService.logoutUser(id);
    res.status(200).json({ message: 'Berhasil Logout' });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await userService.refreshToken(refreshToken);
    res.status(200).json({ message: 'Token refreshed', data: tokens });
  } catch (error) {
    next(error);
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
