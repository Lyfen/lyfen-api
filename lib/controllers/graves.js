import express from 'express';
const router = express.Router();
const db = require("../models");

// Returns Object:
	// Exact Age
	// One year Death Probability
	// Percentage of their cohort that has died
	// Number of seconds remaining in their life

router.get('/:userId', getGrave);

function getGrave (req, res) { 
	// get user by ID
	// calculate age in days
	// get Stats by sex and age in days 
	let grave = {
		age: 40,
		deathProbabilityPercentage: 0.2123,
		cohortDeathPercentage: 4.144,
		lifeSecondsRemaining: 1218123360
	}
	res.json(grave);
}

module.exports = router;