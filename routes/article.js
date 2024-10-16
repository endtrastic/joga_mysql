// Defining important stuff
const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article')

// Using the controller
router.get('/', articleController.GetAllArticles);
router.get('/article/:slug', articleController.GetArticlesBySlug);

module.exports = router;
