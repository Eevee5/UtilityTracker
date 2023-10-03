const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const MONGO_URI = process.env.MONGO_URI;

// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'User',
//   })
//   .then(() => console.log('Connected to Mongo DB.'))
//   .catch((err) => console.log(`${err}: connect to Mongo DB`));

const User = new Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true },
  securityAnswer: { type: String, require: true },
});

module.exports = mongoose.model('User', User);
