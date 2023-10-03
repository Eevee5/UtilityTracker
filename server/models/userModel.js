const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  securityQuestion: { type: String, require: true },
  securityAnswer: { type: String, require: true },
});

module.exports = mongoose.model('User', User);
