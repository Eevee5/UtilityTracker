const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.createUser, (req, res, next) => {
  if (res.locals.user) {
    console.log('User successfully registered');
    return res.status(200).send('Signup successful');
  } else {
    return res.status(401).json({ error: 'Username already taken' });
  }

  //   return res.status(200).json(res.locals.user);
});
router.post('/login', userController.validateUser, (req, res) => {
  res.status(200).send();
});

router.get(
  '/forgotPassword/:username',
  userController.getSecQuestion,
  (req, res) => {
    res.status(200).send(res.locals.question);
  }
);

router.post(
  '/forgotPassword',
  userController.validateSecAnswer,
  (req, res) => {
    return res.status(200).send();
  }
);

module.exports = router;
