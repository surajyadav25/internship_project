const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const rideController = require('../controller/ride')

router.post('/ride/create', authMiddleware, rideController.createRide);

router.post('/ride/bookRide', authMiddleware, rideController.bookRide);

 

router.get('/ride/findride', authMiddleware, rideController.getRides);

router.get('/ride/offeredRides', authMiddleware, rideController.offeredRides);

router.get('/ride/bookedRides', authMiddleware, rideController.getBookedRides);

 



module.exports = router;
