const express = require('express');
const router = express.Router();
const User = require('../user');
const config = require('../config');
const jwt = require('jsonwebtoken');

router.post('/ridehop/signup', async (req, res) => {
  try {
    const { email, fullName, password, confirmPassword, gender, age } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const user = new User({ email, fullName, password, gender, age });
    await user.save();

    // Generate and send the token upon successful signup
    const token = jwt.sign({ user: { id: user.id, email: user.email } }, config.jwtSecret, { expiresIn: 3600 });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        gender: user.gender,
        age: user.age,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
