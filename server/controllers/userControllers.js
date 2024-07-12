const bcrypt = require('bcryptjs');
const emailValidator = require('email-validator');
const asyncHandler = require('express-async-handler');

const generateToken = require('../utils/generateToken');

const Car = require('../schemas/carSchema');
const User = require('../schemas/userSchema');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('All Fields Are Required!');
  } else {
    if (emailValidator.validate(email)) {
      let user = await User.findOne({ email: email });

      if (user != null) {
        const match = await bcrypt.compare(password, user.password);

        if (user.email === email && match) {
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            message: 'Login Successful!',
          });
        } else {
          res.status(401);
          throw new Error('Invalid Email or Password!');
        }
      } else {
        res.status(401);
        throw new Error('Invalid Email or Password!');
      }
    } else {
      res.status(400);
      throw new Error('Invalid Email Address!');
    }
  }
});

// @desc    Add a New Car
// @route   POST /api/users/add-car
// @access  Private

const addCar = asyncHandler(async (req, res) => {
  const { model, price, phone, city, images } = req.body;

  if (!model || !price || !phone || !city || !images) {
    res.status(400);
    throw new Error('All Fields Are Required!');
  } else {
    if (isNaN(price)) {
      res.status(400);
      throw new Error('Price Must Be A Number!');
    } else {
      if (isNaN(phone)) {
        res.status(400);
        throw new Error('Phone Must Be A Number!');
      } else {
        if (phone.length !== 11) {
          res.status(400);
          throw new Error('Phone Must Be 11 Digits Long!');
        } else {
          const car = new Car({
            user: req.user._id,
            model,
            price,
            phone,
            city,
            images,
          });

          const createdCar = await car.save();

          res.status(201).json(createdCar);
        }
      }
    }
  }
});

module.exports = { authUser, addCar };
