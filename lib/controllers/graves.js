import express from 'express';
import moment from 'moment'
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
	db.Users.findById(req.params.userId)
	.then(user => {
		// calculate age in days
		let ageInDays = moment(new Date()).diff(user.dob, 'days');
		let sex = user.sex;

		// get Stats by sex and age in days
		db.Stats.findAll({
			where: {
				age: ageInDays,
				sex: sex
			}
		}).then((stat) => {
			res.json(stat);
		})
	})
	.catch(err => {
		return console.log(err);
	})

	let grave = {
		age: 40,
		deathProbabilityPercentage: 0.2123,
		cohortDeathPercentage: 4.144,
		lifeSecondsRemaining: 1218123360
	}
}

module.exports = router;