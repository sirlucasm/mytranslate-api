
const express = require('express');
const app = express();

const translateApiRoutes = require('./translateapi');
const userRoutes = require('./user');

app.use('/translate', translateApiRoutes);
app.use('/user', userRoutes);

module.exports = app;