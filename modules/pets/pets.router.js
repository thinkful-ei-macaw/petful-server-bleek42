'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const Pets = require('./pets.service');
const People = require('../people/people.service');

const petsRouter = express.Router();
petsRouter.use(bodyParser.json());

petsRouter.get('/', (req, res) => {
  return res.status(200).json(Pets.get());
});

petsRouter.delete('/', (req, res) => {
  // Remove a pet from adoption.
  if (req.body.type !== 'dog' && req.body.type !== 'cat') {
    res.status(400).json({
      message: 'dogs and cats are the only animal type',
    });
    Pets.dequeue(req.body.type);
    People.dequeue();
    return res.status(204).json('pet has been adopted!');
  }
});

module.exports = petsRouter;
