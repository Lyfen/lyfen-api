const db = require("../models")
import async from 'async';

module.exports = function seedDatabaseWithLifeData(table, sex) {

	db.Stats.destroy({
	  where: {},
	  truncate: true
	})

	let queue = async.queue(createRecord, 40)

	queue.drain = function() {
	  console.log('all items have been processed');
	};

	function createRecord(task, cb) {
		//console.log(task);
		db.Stats.create(task)
			.then((stat) => {
				console.log(stat.dataValues)
				return cb();
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const fields = table.fields;
	const data = table.data;

	let ageInDays = 0
	let daysInYear = 365
	let todaysPercentageDead = 0
	let todaysDeathProbability = data[0][1]
	let todaysLifeExpectancy = data[0][3]

	for (let i = 0; i < data.length - 1; i++) {

		let currAge = i
		let nextAge = i + 1

		let currDeathProbability = data[currAge][1]
		let nextDeathProbability = data[nextAge][1]

		let currLivesLeft = Number(data[currAge][2])
		let nextLivesLeft = Number(data[nextAge][2])
		let currPercentDead = (currLivesLeft - nextLivesLeft) / 1000

		let currLifeExpectancy = data[currAge][3]
		let nextLifeExpectancy = data[nextAge][3]

		// Account for Leap Years
		if ( i % 4 == 0 ) {
			daysInYear = 366
		} else {
			daysInYear = 365
		}

		let dailyDeathProbability = (nextDeathProbability - currDeathProbability) / daysInYear
		let dailyPercentLivesLost = (currPercentDead / daysInYear) ; 
		let dailyLifeExpectancyDecrease = (currLifeExpectancy - nextLifeExpectancy) / daysInYear

		for (let j = 0; j <= daysInYear; j++) {

			todaysPercentageDead = todaysPercentageDead > 100 ? 100 : todaysPercentageDead
			// create row 
			let dailyData = {
				age: ageInDays,
				sex: sex,
				deathProbabilityPercentage: Number(todaysDeathProbability.toFixed(5)),
				cohortDeathPercentage: Number(todaysPercentageDead.toFixed(2)),
				lifeSecondsRemaining: Number((todaysLifeExpectancy * 365.25).toFixed(2))
			}

			queue.push(dailyData, function(err) {
			  //console.log('finished processing data');
			});

			ageInDays++
			todaysDeathProbability += dailyDeathProbability
			todaysPercentageDead += dailyPercentLivesLost
			todaysLifeExpectancy -= dailyLifeExpectancyDecrease

		}
	}
}
