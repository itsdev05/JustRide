// // feedbackRoutes.js

// const express = require('express');
// const router = express.Router();
// const Feedback = require('../Models/feedbackMode');

// // Route to add feedback
// router.post('/', async (req, res) => {
//   try {

//     const {text } = req.body;
//     const feedback = new Feedback({ text });
//     await feedback.save();
//     res.status(201).json(feedback);
//   } catch (error) {
//     clg
//     console.error('Error adding feedback:', error);
//     res.status(500).json({ error: 'Failed to add feedback' });
//   }
// });

// module.exports = router;
// feedbackRoutes.js

const express = require('express');
const router = express.Router();
const Feedback = require('../Models/feedbackMode');

// Route to add feedback
router.post('/', async (req, res) => {
  try {

    const {text } = req.body;
    const feedback = new Feedback({ text });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    clg
    console.error('Error adding feedback:', error);
    res.status(500).json({ error: 'Failed to add feedback' });
  }
});

module.exports = router;
