const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = 10;

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password, email, securityAnswer } = req.body;
  // Validate input fields
  if (!username || !password || !email || !securityAnswer) {
    return next({
      log: 'Error in userController.createUser: Missing input fields',
      status: 400,
      message: { err: 'All fields required' },
    });
  }

  try {
    // check if the username already exists in the database
    const findUser = await User.findOne({ username: username });
    // Encrypt user password and insert the new user into the database
    console.log('in try block', findUser);
    // If user exists, send an error response
    if (findUser) {
      //   res.status(409).json({ error: 'Username already exists' });
      //   res.locals.user = 'username already exist';
      return next();
    } else {
      // Encrypt user password and insert the new user into the database
      const hashedPassword = await bcrypt.hash(password, salt);
      const createUser = await User.create({
        username: username,
        password: hashedPassword,
        email: email,
        securityAnswer: securityAnswer,
      });
      createUser.save();
      //   res.locals.user = 'user has been created';
      res.locals.user = createdUser;
      return next();
    }
  } catch (err) {
    return next({
      log: `Error in userController.createUser: ${err}`,
      status: 500,
      message: { err: 'Unable to create user' },
    });
  }
};

module.exports = userController;
