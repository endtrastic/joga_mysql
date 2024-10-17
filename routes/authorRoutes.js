// Defining important stuff
const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Route to get author by ID and show their articles
router.get('/:id', authorController.AuthorsID);

// Exportin :()
module.exports = router;
