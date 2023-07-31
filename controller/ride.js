const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ride = require('../ridem');

// POST request to create a ride
exports.createRide = async(req,res,next)=>{

  const { from, to, pickupPoint, dropOffPoint, dateTime, seats, price } = req.body;

  try {
    // Check if all required fields are provided
    if (!from || !to || !pickupPoint || !dropOffPoint || !dateTime || !seats || !price) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if seats and price are valid numbers
    if (isNaN(seats) || isNaN(price) || seats <= 0 || price <= 0) {
      return res.status(400).json({ error: 'Invalid seats or price value' });
    }
  //  console.log(req.user)
    // Create the ride object
    const newRide = new Ride({
      from,
      to,
      pickupPoint,
      dropOffPoint,
      dateTime,
      seats,
      price,
      bookingId:generateFourDigitUniqueID() || 0000,
      user: req.user
    });
// console.log(newRide)
    // Save the ride to the database
    newRide.save().then(result=>{
      // console.log('1111'+result)
      return res.status(201).json({
      message: 'Ride Created',
      ride:result,
    });
    }).catch(err=>{
      res.status(500).json({ error: 'Internal server error' });

    });

  
  } catch (error) {
    // Handle any database or server errors
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getRides =async (req, res) => {
  try {
    // Extract filter parameters from the query string
    const { from, to, seats} = req.query;

    // Build the filter object based on the provided parameters
    const filter = {};
    if (from) filter.from = from;
    if (to) filter.to = to;
    if (seats) filter.seats = { $gte: parseInt(seats, 10) };
  
    // Query the database with the filter object
    const filteredRides = await Ride.find(filter);

    // Send the filtered rides as the response
    res.json(filteredRides);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'Internal server error' });
  }
}




exports.offeredRides = async (req, res)=>{

    try{

      console.log(req.user)
          const rides = await Ride.find({ user: req.user.id });

console.log(rides)
    res.json(rides);
    }catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'Internal 1111 server error' });
  }
}


// router.post('/ride/findride', async (req, res) => {
//   const { from, to, seats, dateTime } = req.body;

//   try {
//     // Check if all required fields are provided
//     if (!from || !to || !seats || !dateTime) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     // Check if seats is a valid number
//     if (isNaN(seats) || seats <= 0) {
//       return res.status(400).json({ error: 'Invalid seats value' });
//     }

//     // Parse dateTime into a Date object
//     const searchDateTime = new Date(dateTime);

//     // Find rides that match the provided criteria
//     const foundRides = await Ride.find({
//       from,
//       to,
//       seats: { $gte: seats }, // Find rides with available seats greater than or equal to the requested seats
//       dateTime: { $gte: searchDateTime }, // Find rides with dateTime greater than or equal to the requested dateTime
//     });

//     // Respond with the found rides
//     res.json(foundRides);
//   } catch (error) {
//     // Handle any database or server errors
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;


function generateFourDigitUniqueID() {
  const usedIDs = new Set();

  while (true) {
    // Generate a random 4-digit number between 1000 and 9999
    const id = Math.floor(Math.random() * 9000) + 1000;

    // Check if the ID is unique, if not, generate a new one
    if (!usedIDs.has(id)) {
      usedIDs.add(id);
      return id;
    }
  }
}

// Example usage
// const uniqueID = generateFourDigitUniqueID();
// console.log("4-digit Unique ID:", uniqueID);
