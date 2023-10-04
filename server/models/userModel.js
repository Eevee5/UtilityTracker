const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  securityQuestion: { type: String, required: true },
  securityAnswer: { type: String, required: true },
  // Potential fields for OAuth
  oauthProvider: { type: String },
  oauthId: { type: String },
});

module.exports = mongoose.model('User', User);
