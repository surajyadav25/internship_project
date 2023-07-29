// // db.js
// const { MongoClient } = require('mongodb');

// const databaseUrl = 'mongodb+srv://sysurajyadav25:admin@cluster0.lnktjem.mongodb.net/?retryWrites=true&w=majority'; // Replace this with your actual connection string

// async function connectToDatabase() {
//   try {
//     const client = await MongoClient.connect(databaseUrl, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       // Add the following line to enable debugging
//       // debug: true
//     });

//     console.log('Connected to MongoDB database');
//     return client.db(); // Return the database object to use it in your app
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     throw error;
//   }
// }


// module.exports = { connectToDatabase };


// db.js
require('dotenv').config();
const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

module.exports = mongoose.connection;



