'use strict';

const Queue = require('../queue/Queue');
const store = require('../../store');

// Set up initial data.
// --------------------

const pets = {
  cats: new Queue(),
  dogs: new Queue(),
};

store.cats.forEach((cat) => pets.cats.enqueue(cat));
store.dogs.forEach((dog) => pets.dogs.enqueue(dog));

// --------------------

module.exports = {
  get() {
    // Return the pets next in line to be adopted.
    const nextPets = { dog: pets.dogs.show(), cat: pets.cats.show() };
    return nextPets;
  },
  all() {
    return { dogs: pets.dogs.all(), cats: pets.cats.all() };
  },

  dequeue(type) {
    // Remove a pet from the queue.
    if (!pets[type].show()) {
      store[type].forEach((pet) => pets[type].enqueue(pet));
    }
    const pet = pets[type].dequeue();
    return pet;
  },
};
