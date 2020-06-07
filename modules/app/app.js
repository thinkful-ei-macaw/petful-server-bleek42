/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');
const { NODE_ENV } = require('../../config');
const peopleRouter = require('../people/people.router');
const petsRouter = require('../pets/pets.router');

const app = express();

app.use(cors());

app.use('/people', peopleRouter);
app.use('/pets', petsRouter);

const errorHandler = (error, req, res, next) => {
  const response =
    NODE_ENV === 'production'
      ? { error: 'Server error' }
      : (console.error(error), { error: error.message, details: error });
  console.log({ error });
  res.status(500).json(response);
};

app.use(errorHandler);

module.exports = app;
