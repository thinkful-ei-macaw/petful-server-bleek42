'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const People = require('./people.service');

const peopleRouter = express.Router();
peopleRouter.use(bodyParser.json());

peopleRouter.get('/', (req, res) => {
  // Return all the people currently in the queue.
  return res.status(200).json(People.get());
});

peopleRouter.post('/', (req, res) => {
  // Add a new person to the queue.
  if (!req.body.name) {
    res.status(400).json({
      message: 'name is required',
    });
  }
  People.enqueue(req.body.name);
  return res.status(201).end();
});

peopleRouter.delete('/', (req, res) => {
  People.dequeue();
  return res.status(201).end();
});

module.exports = peopleRouter;
