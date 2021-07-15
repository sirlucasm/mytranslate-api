
const express = require('express');
const app = express();

const translateApiRoutes = require('./translateapi');
const userRoutes = require('./user');
const tokenRequestRoutes = require('./tokenRequest');

app.use('/translate', translateApiRoutes);
app.use('/user', userRoutes);
app.use('/token-request', tokenRequestRoutes);

module.exports = app;