const express = require('express');

const notesRouter = require('../public/assets/js/index')

const app = express();

app.use('/notes', notesRouter);

module.exports = app;