const express = require('express');
const router = express.Router(); // Create a router instead of a new app

// Require and use the route files
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const protectedRoute = require('./routes/protected');
const rideRoute = require('./routes/protected');

router.use(signupRoute);
router.use(loginRoute);
router.use(protectedRoute);
router.use(rideRoute);

module.exports = router; // Export the router
