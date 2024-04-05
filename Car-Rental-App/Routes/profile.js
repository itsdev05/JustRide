// backend/routes/profile.js

const express = require('express');
const router = express.Router();
const userModel = require('../Models/userModal');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
