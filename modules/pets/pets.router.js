'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();

const Pets = require('./pets.service');
const People = require('../people/people.service');

const petsRouter = express.Router();

petsRouter.route('/next').get((req, res) => {
  // if (req.body !== 'dog') {
  //   res.status(400).json({
  //     message: 'request body must have value of dog!',
  //   });
  // }
  const currentPets = Pets.get();
  return res.status(200).json({ currentPets });
});

petsRouter.get('/all', (req, res) => {
  return res.status(200).json(Pets.all());
});

petsRouter.delete('/dogs/adopt', jsonParser, (req, res) => {
  // Remove a pet from adoption.
  Pets.dequeue('dog');
  People.dequeue();
  Pets.get();
  return res.status(204).end();
});

petsRouter.delete('/cats/adopt', jsonParser, (req, res) => {
  Pets.dequeue('cat');
  People.dequeue();
  return res.status(204).end();
});

module.exports = petsRouter;
