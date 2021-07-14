require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');

const PORT = process.env.PORT || 3000;
const URL = process.env.APP_URL || `http://localhost:${PORT}`;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(PORT, () => console.log(`\nlistening on port ${URL}\n`));