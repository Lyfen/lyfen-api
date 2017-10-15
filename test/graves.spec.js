import assert from 'assert';
import request from 'request';
import should from 'should';

const db = require("../lib/models");

describe('Graves Routes', () => {
	let grahamID;
	let jamesID;

	before((done) => {
		let date = new Date();

		// insert Graham
		let thirtyTwoYearsAgo  = date.setDate(date.getDate()-(365.25*32)) 
		let graham = {
			json: {
				username: 'testing',
				email: 'testing@example.com',
				password: 'password',
				dob: thirtyTwoYearsAgo,
				height: 70,
			  weight: 250,
			  sex: 'male'
			}
		}

		request.post('http://localhost:1701/users', graham, (err, res, body) => {
			grahamID = body.id
			done();
		});
	})
	
	after((done) => {
		request.delete('http://localhost:1701/users/' + grahamID);
		done();
	})

	it('should return 32 year old\'s accurate grave data', done => {
		request.get('http://localhost:1701/graves/' + grahamID, (err, res, body) => {
			let grave = JSON.parse(body)[0]
			assert.equal(grave.deathProbabilityPercentage, 0.00156);
			assert.equal(grave.cohortDeathPercentage, 2.77);
			assert.equal(grave.lifeSecondsRemaining, 16800.95);
			done();
		})
	})
})