const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const User = require('./user');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.post('/ridehop/signup', async (req, res) => {
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


app.post('/ridehop/login', async (req, res) => {
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


app.get('/ridehop/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected route access granted.' });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
