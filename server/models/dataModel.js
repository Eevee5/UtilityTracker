const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Datum = new Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  Name: { type: String, required: true },
  Amount: { type: Number, required: true },
  Date: { type: Date, required: true },
});

module.exports = mongoose.model('Datum', Datum);
