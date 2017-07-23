import express from 'express';
const router = express.Router();
const db = require("../models");

// Returns Object:
// Exact Age
// Death Probability
// numbers of lives for their sex
// number of seconds remaining in their life

router.get('/:userId', getGrave);

function getGrave (req, res) { 
	let grave = {
		age: 40,
		deathProbabilityPercentage: 0.2123,
		cohortDeathPercentage: 4.144,
		lifeSecondsRemaining: 1218123360
	}
	res.json(grave);
}

module.exports = router;