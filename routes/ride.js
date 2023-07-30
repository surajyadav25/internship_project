const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ride = require('../ridem');

// POST request to create a ride
router.post('/ride/create', async (req, res) => {
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

    // Create the ride object
    const newRide = new Ride({
      from,
      to,
      pickupPoint,
      dropOffPoint,
      dateTime,
      seats,
      price,
    });

    // Save the ride to the database
    const savedRide = await newRide.save();

    // Respond with the success message and the created ride details
    res.status(201).json({
      message: 'Your ride is booked',
      bookingId: savedRide._id,
      ride: '1',
    });
  } catch (error) {
    // Handle any database or server errors
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
