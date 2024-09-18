const Joi = require('joi');

const userValidationSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'superadmin', 'user'),
});

const userLoginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Kata sandi harus diisi.',
    'string.empty': 'Kata sandi tidak boleh kosong.',
    'string.min': 'Kata sandi minimal harus 6 karakter.',
  }),
});

const getUserByIdValidationSchema = Joi.number().positive().required();

module.exports = {
  userValidationSchema,
  userLoginValidationSchema,
  getUserByIdValidationSchema,
};
