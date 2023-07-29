// // app.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const { connectToDatabase } = require('./db'); // Import the database connection function
// const User = require('./models/User'); // Import the User model
// const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
// const cors = require('cors');

// const app = express();
// const PORT = 3000; // Change this to any available port you prefer
// app.use(cors());

// app.use(bodyParser.json());

// // Endpoint for user registration (signup)
// app.post('/api/signup', async (req, res) => {
//   try {
//     const { email, fullName, password, confirmPassword, gender, age } = req.body;

//     // Check if the email already exists in the database
//     const existingUser = await User.findOne({ email }).maxTimeMS(30000);
//     if (existingUser) {
//       return res.status(409).json({ error: 'Email already exists.' });
//     }

//     // Check if the provided passwords match
//     if (password !== confirmPassword) {
//       return res.status(400).json({ error: 'Passwords do not match.' });
//     }

//     // Hash the password using bcrypt
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user document with the provided data
//     const newUser = new User({ email, fullName, password: hashedPassword, gender, age });
//     await newUser.save();

//     res.json({ message: 'User registered successfully.' });
//   } catch (error) {
//     console.error('Registration Error:', error);
//     res.status(500).json({ error: 'Failed to register user.' });
//   }
// });

// (async () => {
//   try {
//     const db = await connectToDatabase();
//     // You can now use the 'db' object to interact with your MongoDB Atlas database

//     // Endpoint for user login (login API)
//     app.post('/api/login', async (req, res) => {
//       // ... (login API code, similar to your previous implementation)
//     });

//     // Start the server
//     app.listen(PORT, () => {
//       console.log(`Server started on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     // Handle any errors that occur during the database connection
//     console.error('Error connecting to database:', error);
//     process.exit(1); // Exit the application in case of connection failure
//   }
// })();


// app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const User = require('./user');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Signup API
app.post('/ridehop/signup', async (req, res) => {
  try {
    const { email, fullName, password, confirmPassword, gender, age } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Create the user
    const user = new User({ email, fullName, password, gender, age });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login API
app.post('/ridehop/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists and the password is correct
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
