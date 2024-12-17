const Joi = require('joi');
 
exports.signInSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(8)
    .max(16)
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'string.min': 'Email must be at least 8 characters long',
      'string.max': 'Email cannot exceed 16 characters',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .min(6)
    .max(10)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password cannot exceed 10 characters',
      'any.required': 'Password is required',
    }),
});
 
exports.signUpSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(8)
    .max(16)
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'string.min': 'Email must be at least 8 characters long',
      'string.max': 'Email cannot exceed 16 characters',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .min(6)
    .max(10)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password cannot exceed 10 characters',
      'any.required': 'Password is required',
    }),
  userName: Joi.string()
    .min(5)
    .max(16)
    .required()
    .messages({
      'string.min': 'User name must be at least 5 characters long',
      'string.max': 'User name cannot exceed 16 characters',
      'any.required': 'User name is required',
    }), 
});
 
exports.getUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(8)
    .max(16)
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'string.min': 'Email must be at least 8 characters long',
      'string.max': 'Email cannot exceed 16 characters',
      'any.required': 'Email is required',
    }),
  userRole: Joi.string()
    .valid('admin', 'hr', 'employee')
    .required()
    .messages({
      'any.only': "Invalid user role. Allowed values are 'admin', 'hr', and 'employee'",
      'any.required': 'User role is required',
    }),
});

exports.createUserRoleSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(8)
    .max(16)
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'string.min': 'Email must be at least 8 characters long',
      'string.max': 'Email cannot exceed 16 characters',
      'any.required': 'Email is required',
    }), 
  userRole: Joi.string()
    .valid('admin', 'hr', 'employee')
    .required()
    .messages({
      'any.only': "Invalid user role. Allowed values are 'admin', 'hr', and 'employee'",
      'any.required': 'User role is required',
    }),
});