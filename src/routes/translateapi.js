const express = require('express');
const router = express.Router();

// middlewares
const Auth = require('../routes/middlewares/Auth');

// controllers
const TranslateController = require('../controllers/TranslateController');


router.post('/', Auth, TranslateController.translate);
router.get('/*status*', TranslateController.index);
router.get('/languages', TranslateController.getLanguages);

module.exports = router;