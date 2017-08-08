// import fs   from 'fs'
// import path from 'path'

const db = require("../models")

// Import males stats
// convert from CSV to array 
stats = [
	[0, 0.005313, 100000, 81.11],
	[1, 0.000346, 99469, 80.54],
	[2, 0.000221, 99434, 79.57]
]
let ageInDays = 0
let daysInYear = 365
let todaysDeathProbability = stats[0][1]
let todaysPercentageDead = 0
let todaysLifeExpectancy = stats[0][3]

for (let i = 0; i < stats.length - 1; i++) {

	let currAge = i
	let nextAge = i + 1

	let currDeathProbability = stats[currAge][1]
	let nextDeathProbability = stats[nextAge][1]

	let nextLivesLeft = stats[nextAge][2]
	let currPercentDead = (100000 - nextLivesLeft) / 1000

	let currLifeExpectancy = stats[currAge][3]
	let nextLifeExpectancy = stats[nextAge][3]

	// Account for Leap Years
	if ( i % 4 == 0 ) {
		daysInYear = 366
	} else {
		daysInYear = 365
	}

	let dailyDeathProbability = (nextDeathProbability - currDeathProbability) / daysInYear
	let dailyPercentLivesLost = currPercentDead / daysInYear; 
	let dailyLifeExpectancyDecrease = (currLifeExpectancy - nextLifeExpectancy) / daysInYear

	for (let j = 0; j <= daysInYear; j++) {
		// create row 
		let dailyStats = {
			"age": ageInDays,
			"DeathProbability": todaysDeathProbability,
			"PercentageDead": todaysPercentageDead,
			"LifeExpectancy": todaysLifeExpectancy
		}
		console.log(dailyStats)

		// db.Stats.create(dailyStats)
		// 	.then((stat) => {
		// 		console.log(stat)
		// 	})

		ageInDays++
		todaysDeathProbability += dailyDeathProbability
		todaysPercentageDead += dailyPercentLivesLost
		todaysLifeExpectancy -= dailyLifeExpectancyDecrease

	}
}
