const router = require('express').Router();
const { body } = require('express-validator/check');
const authController = require('../controllers/auth');
const User = require('../models/User');
const isAuth = require('../middleware/is-auth');

router.post('/signup', 
  [
    // TODO: Add normalize email and check
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        })
      }),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid password.'),
    body('full_name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter a valid name.')
  ]
, authController.signUp);
router.post('/signin', authController.signIn);
router.get('/users', authController.getUsers);
router.post('/users/delete/:userId', isAuth ,authController.deleteUser);

module.exports = router;
