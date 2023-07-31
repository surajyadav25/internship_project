const express = require('express');
const router = express.Router();
const User = require('../user');
const config = require('../config');
const jwt = require('jsonwebtoken');

router.post('/ridehop/login', async (req, res) => {
  try {
     const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate and send the token upon successful login
    // console.log(user.id, user.email)
    const token = jwt.sign({user:{id:user.id,email:user.email}},config.jwtSecret,{expiresIn:3600})

    return res.status(200).json({
      token:token,
      user:user
    })
    // res.header('x-auth-token', token).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
