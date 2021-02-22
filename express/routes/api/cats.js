const express = require('express');
const asyncHandler = require('express-async-handler');

const { Cat, Toy, Owner } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async function (req, res, next) {
  const cats = await Cat.findAll();
  res.json({ cats });
}));
router.get('/owners', asyncHandler(async function (req, res, next) {
  const cats = await Cat.findAll({ include: [Owner] });
  const result = []
  for (cat of cats) {
    result.push({
      name: cat.name,
      // owner: await cat.getOwner(),
      owner: cat.owner,
      breed: cat.breed,
      color: cat.color
    });
  }
  res.json({ cats: result });
}));
router.get('/toys', asyncHandler(async function (req, res, next) {
  // Too Permissive needs revision
  const cats = await Cat.findAll({ include: [{ all: true, nested: true }] });
  const result = []
  for (cat of cats) {
    const toys = []
    for (toy of cat.Toys) {
      const toyType = toy.ToyType;
      toys.push({
        name: toy.name,
        type: toyType.name
      })
    }
    result.push({
      name: cat.name,
      breed: cat.breed,
      toys: toys,
      color: cat.color
    });
  }
  res.json({ cats: result });
}));
module.exports = router;
