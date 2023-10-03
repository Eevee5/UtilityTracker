const express = require('express');
const passport = require('passport');
const router = express.Router();
const JWTController = require('../controllers/JWTController')

const oAuthController = require('../controllers/oAuthController');

router.get(
  'github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  'github/callback',
  passport.authenticate('github', { failureRedirect: '/user/login' }), 
  JWTController.generateToken,
  (req, res) => {
    res.status(200).send();
  }
);

module.exports = router;