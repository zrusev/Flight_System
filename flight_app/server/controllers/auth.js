const { validationResult } = require('express-validator/check');
const validator = require('validator')
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const encryption = require('../util/encryption');
const secret = require('secret');

function validateSignupForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.full_name !== 'string' || payload.full_name.trim().length < 4) {
    isFormValid = false
    errors.full_name = 'Name must be at least 4 characters long';
  }

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false
    errors.email = 'Please provide a correct email address';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false
    errors.password = 'Password must be at least 8 characters long';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

function validateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      success: false,
      message: 'Validation failed, entered data is incorrect',
      errors: errors.array()
    });

    return false;
  }

  return true;
}

function validateLoginForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0 || !validator.isEmail(payload.email)) {
    isFormValid = false
    errors.email = 'Please provide your email address.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false
    errors.password = 'Please provide your password.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

module.exports = {
  signUp: (req, res, next) => {
    const validationResult = validateSignupForm(req.body)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }  

    if (validateUser(req, res)) {
      const { email, password, full_name } = req.body;
      const salt = encryption.generateSalt();
      const hashedPassword = encryption.generateHashedPassword(salt, password);
      User.create({
          email,
          hashedPassword,
          full_name,
          salt,
          roles: ['User']
        }).then((user) => {
          res.status(201)
            .json({            
              message: 'User created!',
              success: true,
              userId: user._id
            });
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }

          next(error);
        });
    }
  },
  signIn: (req, res, next) => {
    const validationResult = validateLoginForm(req.body)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    const { email, password } = req.body;

    User.findOne({
        email: email
      })
      .then((user) => {
        if (!user) {
          const error = new Error('A user with this email could not be found');
          error.statusCode = 401;
          throw error;
        }

        if (!user.authenticate(password)) {
          const error = new Error('A user with this email could not be found');
          error.statusCode = 401;
          throw error;
        }

        const token = jwt.sign({ email: user.email, userId: user._id.toString() }
        , secret.get('hashSecret'), {
          expiresIn: '1h'
        });

        res.status(200).json({
          message: 'User successfully logged in!',
          success: true,
          token,
          userId: user._id.toString()
        });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      })
  }
}