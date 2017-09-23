import express from 'express';
const router = express.Router();
const db = require("../models");
const seeders = require('../seeders/statsSeeder');
const maleLifeTable = require('../seeders/male_life_table.json');
const femaleLifeTable = require('../seeders/female_life_table.json')

// Refeshes Stats table with life table data.

router.get('/', refreshStats);

function refreshStats (req, res) { 
  seeders(maleLifeTable, 'male');
  seeders(femaleLifeTable, 'female');
  res.send('refreshing stats!');
}

module.exports = router;