const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const rideController = require('../controller/ride')

router.post('/ride/create', authMiddleware, rideController.createRide);
router.post('/ride/findride', authMiddleware, rideController.getRides);


router.get('/ride/offeredRides', authMiddleware, rideController.offeredRides);



module.exports = router;
