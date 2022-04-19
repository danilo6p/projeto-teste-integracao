const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./src/useCases/user')(app);
require('./src/useCases/product')(app);

module.exports = app;
