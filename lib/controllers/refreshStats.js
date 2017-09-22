import express from 'express';
const router = express.Router();
const db = require("../models");
const seeders = require('../seeders/statsSeeder');
const maleLifeTable = require('../seeders/male_life_table.json');
const femaleLifeTable = require('../seeders/female_life_table.json')

// Returns Object:
  // Exact Age
  // One year Death Probability
  // Percentage of their cohort that has died
  // Number of seconds remaining in their life

router.get('/', refreshStats);

function refreshStats (req, res) { 
  seeders(maleLifeTable);
  seeders(femaleLifeTable);
}

module.exports = router;