const mongoose = require('mongoose');
require('dontenv').config();

mongoose.connect(process.env.MONGO_URI);
mongoose.connect.once('open', () => {
  console.log('connected to mongoDB');
});
