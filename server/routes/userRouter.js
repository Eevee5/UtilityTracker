const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.createUser, (req, res, next) => {
  if (res.locals.user) {
    console.log('User successfully registered');
    return res.status(200).send('Signup successful');
  } else {
    return res.status(500).json({ error: 'Username already taken' });
  }

  //   return res.status(200).json(res.locals.user);
});

module.exports = router;
