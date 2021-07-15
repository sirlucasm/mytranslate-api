const express = require('express');
const router = express.Router();

// middlewares

// controllers
const TokenRequestController = require('../controllers/TokenRequestController');

router.get('/', TokenRequestController.request);
router.get('/my', TokenRequestController.findMyRequest);

module.exports = router;