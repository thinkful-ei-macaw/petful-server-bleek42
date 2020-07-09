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
  const allPets = Pets.all();
  return res.status(200).json({ allPets });
});

petsRouter.delete('/select', jsonParser, (req, res) => {
  // Remove a pet from adoption.\
  const { type } = req.body.type;
  if (type !== 'dog' || type !== 'cat') {
    res.status(400).json({
      error: 'request body is not a cat or dog!',
    });
  }
  Pets.dequeue(type);
  People.dequeue();
  Pets.get();
  return res.status(204).end();
});

module.exports = petsRouter;
