// contactRoute.js

const express = require('express');
const router = express.Router();
const contactController = require('../Controllers/contactController');

router.post('/', contactController.createContact);

module.exports = router;
