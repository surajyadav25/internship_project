const express = require('express');
const router = express.Router();
const User = require('../user');

router.post('/ridehop/signup', async (req, res) => {
  try {
    const { email, fullName, password, confirmPassword, gender, age } = req.body;

   
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    
    const user = new User({ email, fullName, password, gender, age });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
