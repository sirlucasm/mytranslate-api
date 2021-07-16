const express = require('express');
const router = express.Router();

// middlewares

// controllers
const TokenRequestController = require('../controllers/TokenRequestController');

router.get('/', TokenRequestController.request);
router.get('/my', TokenRequestController.findMyRequest);
router.post('/admin/response', TokenRequestController.adminResponse);
router.get('/admin/requests', TokenRequestController.requests);

module.exports = router;