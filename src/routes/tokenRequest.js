const express = require('express');
const router = express.Router();

// middlewares
const OnlyAdmin = require('../routes/middlewares/OnlyAdmin');

// controllers
const TokenRequestController = require('../controllers/TokenRequestController');

router.get('/', TokenRequestController.request);
router.get('/my', TokenRequestController.findMyRequest);
router.post('/admin/response', OnlyAdmin, TokenRequestController.adminResponse);
router.get('/admin/requests', OnlyAdmin, TokenRequestController.requests);

module.exports = router;