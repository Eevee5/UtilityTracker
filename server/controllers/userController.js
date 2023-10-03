const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = 10;

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password, securityQuestion, securityAnswer } = req.body;
  // Validate input fields
  if (!username || !password || !securityQuestion || !securityAnswer) {
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
      const createdUser = await User.create({
        username: username,
        password: hashedPassword,
        securityQuestion: securityQuestion,
        securityAnswer: securityAnswer,
      });
      console.log('created user: ', createdUser);
      createdUser.save();
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

userController.validateUser = async (req, res, next) => {
  const { username, password } = req.body;
  // Validate input fields
  if (!username || !password) {
    return next({
      log: 'Error in userController.validateUser: Missing input fields',
      status: 400,
      message: { err: 'All fields required' },
    });
  }
  try {
    const user = User.findOne({ username: username });
    res.locals.userId = user._id;
    const result = await bcrypt.compare(password, user.password);
    if (!result) return res.status(401).send();
    else return next();
  } catch (err) {
    return next({
      log: err,
      status: 400,
      message: { err: 'failed to find user in database' },
    });
  }
};

userController.getSecQuestion = async (req, res, next) => {
  const username = req.params.username;
  if (!username) return next({ err: 'you need a username' });
  try {
    const userObj = await User.findOne({ username });
    if (!userObj) return res.status(401).send();
    else res.locals.question = userObj.securityQuestion;
    return next();
  } catch (err) {
    return next(err);
  }
};

userController.validateSecAnswer = async (req, res, next) => {
  const { username, securityAnswer } = req.body;
  if (!username || !securityAnswer) {
    return next({ err: 'All fields required' });
  }
  try {
    const checkSecAnswer = await User.findOne({
      username: username,
      securityAnswer: securityAnswer,
    });
    if (checkSecAnswer) {
      return next();
    }
    else return res.status(401).send();
  } catch (err) {
    return next(err);
  }
};

userController.updatePassword = async (req, res, next) => {
  const {username, password} = req.body;
  const update = {password: password};
  if(!username ||!password) return next('you need a password');
  try{
    await User.findOneAndUpdate({username}, update);
    return next();
  }
  catch (err) {
    return next(err);
  }
}

module.exports = userController;
