const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const Ride = require('../ridem');

const User = require('../user');

const { ObjectId } = require('mongodb');

 

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

 

   const rideCreatedUser = await User.find({_id:req.user.id})

   const updatedRideCreatedUser = rideCreatedUser.length >= 0 ? {

        "fullName":rideCreatedUser[0].fullName,

        "email":rideCreatedUser[0].email,

        "gender":rideCreatedUser[0].gender,

        "age":rideCreatedUser[0].age,

        "id":rideCreatedUser[0]._id

 

   }:{}

 

    // Create the ride object

    const newRide = new Ride({

      from,

      to,

      pickupPoint,

      dropOffPoint,

      dateTime,

      seats,

      price,

      bookingId:generateFourDigitUniqueID(),

      user: updatedRideCreatedUser || {}

    });

    // Save the ride to the database

    newRide.save().then(result=>{

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

        const rides = await Ride.find({ 'user.id': new ObjectId(req.user.id) });

    res.json(rides);

    }catch (error) {

    // Handle any errors

    res.status(500).json({ error: 'Internal server error' });

  }

}

exports.bookRide = async (req, res)=>{

 

    try{

 

      // finding user who is booking ride

      let userBookingRide = await User.find({'_id':new ObjectId(req.user.id)})

     

      // get booking ride details

      const {id, from, to, seats} = req.body

     

      // get ride

      const ride_id = new ObjectId(id)

 

      //find ride

      let currentRide = await Ride.find({_id: ride_id})

 

      // check for seats availability and ride details

      if((currentRide[0].seats > seats) && (from === currentRide[0].from) && (to===currentRide[0].to)){

       

        // decrease ride seats by number of seats to book

        currentRide[0].seats = (currentRide[0].seats - seats) || 0

       

       

        // add booked ride to user who is booking the ride

        userBookingRide[0].ridesBooked.push({...currentRide,seats:seats})

        

       

        // add users to ride deatails to show details in UI about users who booked ride

        currentRide[0].bookingUsers.push({fullName:userBookingRide[0].fullName,email:userBookingRide[0].email,gender:userBookingRide[0].gender,age:userBookingRide[0].age, seats})

       

        // save data in BD

        await userBookingRide[0].save()

        await currentRide[0].save()

 

        return res.status(200).json({message:`Ride booked with ${seats} seats !!`})  

      }else{

        return res.status(200).json({message:`${seats} Seats are not avaiable !!!`})

      }

    }catch (error) {

    // Handle any errors

    res.status(500).json({ error: 'Internal server error' });

  }

}

 

exports.getBookedRides = async (req,res)=>{

  try{

    const currentUser = await User.find({'_id':new ObjectId(req.user.id)})
    res.json(currentUser[0].ridesBooked || []);

  }catch (error) {

    // Handle any errors

    res.status(500).json({ error: 'Internal server error' });

  }

}

 

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