// // models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   fullName: { type: String, required: true },
//   password: { type: String, required: true },
//   gender: { type: String, required: true },
//   age: { type: Number, required: true },
// });

// // ... (password hashing and comparison methods, if not already defined)

// // Define a pre-save hook to hash the password before saving the user
// userSchema.pre('save', async function (next) {
//   const user = this;
//   if (!user.isModified('password')) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

// // Compare the provided password with the hashed password
// userSchema.methods.comparePassword = async function (password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = mongoose.model('User', userSchema);

// user.js
const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);
