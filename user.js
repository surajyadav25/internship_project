const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./config');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

// userSchema.methods.generateAuthToken = function () {
// console.log('this')
//   const token = jwt.sign({ _id: this._id ,user:this}, config.jwtSecret, { expiresIn: '1h' });
//   return token;
// };

module.exports = mongoose.model('User', userSchema);
