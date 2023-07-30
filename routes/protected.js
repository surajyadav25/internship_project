const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/ridehop/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected route access granted.' });
});

module.exports = router;
