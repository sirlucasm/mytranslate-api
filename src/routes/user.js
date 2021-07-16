const express = require('express');
const router = express.Router();

// middlewares
const OnlyAdmin = require('../routes/middlewares/OnlyAdmin');

// controllers
const UserController = require('../controllers/UserController');

router.post('/register', OnlyAdmin, UserController.create);
router.post('/authenticate', UserController.authenticate);
router.post('/authenticate/admin', UserController.authenticateAdmin);

module.exports = router;