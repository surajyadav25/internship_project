const express = require('express');
const router = express.Router();
const User = require('../user');

router.post('/ridehop/login', async (req, res) => {
  try {
     const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate and send the token upon successful login
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
