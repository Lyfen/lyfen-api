const db = require("../models")
const maleLifeTable = require('./male_life_table.json');
const femaleLifeTable = require('./female_life_table.json')

seedDatabaseWithLifeData(maleLifeTable);

// Import males data
// convert from CSV to array 
stats = [
	[0, 0.005313, 100000, 81.11],
	[1, 0.000346, 99469, 80.54],
	[2, 0.000221, 99434, 79.57]
]

function seedDatabaseWithLifeData(table) {

	const fields = table.fields;
	const data = table.data;

	let ageInDays = 0
	let daysInYear = 365
	let todaysDeathProbability = data[0][1]
	let todaysPercentageDead = 0
	let todaysLifeExpectancy = data[0][3]

	for (let i = 0; i < data.length - 1; i++) {

		let currAge = i
		let nextAge = i + 1

		let currDeathProbability = data[currAge][1]
		let nextDeathProbability = data[nextAge][1]

		let nextLivesLeft = Number(data[nextAge][2])
		let currPercentDead = (100000 - nextLivesLeft) / 1000

		let currLifeExpectancy = data[currAge][3]
		let nextLifeExpectancy = data[nextAge][3]

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
			let dailydata = {
				"age": ageInDays,
				"DeathProbability": todaysDeathProbability,
				"PercentageDead": todaysPercentageDead,
				"LifeExpectancy": todaysLifeExpectancy
			}
			console.log(dailydata)

			// db.data.create(dailydata)
			// 	.then((stat) => {
			// 		console.log(stat)
			// 	})

			ageInDays++
			todaysDeathProbability += dailyDeathProbability
			todaysPercentageDead += dailyPercentLivesLost
			todaysLifeExpectancy -= dailyLifeExpectancyDecrease

		}
	}
}
