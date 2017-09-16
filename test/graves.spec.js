import assert from 'assert';
import request from 'request';
import should from 'should';

const db = require("../lib/models");

describe('Graves Routes', () => {
	let grahamID;
	let jamesID;

	before(()=> {
		let date = new Date();

		// insert Graham
		let thirtyTwoYearsAgo  = date.setDate(date.getDate()-(365.25*32))  
		let graham = {
			username: 'graham',
			email: 'grahamtest@example.com',
			dateOfBirth: thirtyTwoYearsAgo
		}
		request.post('http://localhost:1701/users', graham, (err, res, body) => {
				grahamID = body.id
		    });
		// insert actuarial data
		db.Stats.create({
				age: 32,
		    	sex: 'male',
		    	deathProbabilityPercentage: 0.000753,
		    	cohortDeathPercentage: 1.495,
		    	lifeSecondsRemaining: 1581982488
			}).catch((err) => console.log('Test Suite Error!:', err));
		

		// insert James
		let thirtyFourYearsAgo = date.setDate(date.getDate()-(365.25*34))
		let james = {
			username: 'james',
			email: 'jamestest@example.com',
			dateOfBirth: thirtyFourYearsAgo
		}
		request.post('http://localhost:1701/users', james, (err, res, body) => {
				jamesID = body.id
		    });
		// insert actuarial data
		db.Stats.create({
				age: 34,
		    	sex: 'male',
		    	deathProbabilityPercentage: 0.000864,
		    	cohortDeathPercentage: 1.649,
		    	lifeSecondsRemaining: 1521391896
			}).catch((err) => console.log('Test Suite Error!:', err));
	})
	
	after(()=> {
		request.delete('http://localhost:1701/users/' + grahamID);
		request.delete('http://localhost:1701/users/' + jamesID);
	})

	it('should return Graham\'s accurate grave data', done => {
		request.get('http://localhost:1701/graves/' + grahamID, (err, res, body) => {
			assert.equal(JSON.parse(body).deathProbabilityPercentage, 0.0753);
			assert.equal(JSON.parse(body).cohortDeathPercentage, 1.495);
			assert.equal(JSON.parse(body).lifeSecondsRemaining, 1581982488);
			done();
		})
	})
	
	it('should return James\' accurate grave data', done => {
		request.get('http://localhost:1701/graves/' + jamesID, (err, res, body) => {
			assert.equal(JSON.parse(body).deathProbabilityPercentage, 0.0864);
			assert.equal(JSON.parse(body).cohortDeathPercentage, 1.649);
			assert.equal(JSON.parse(body).lifeSecondsRemaining, 1521391896);
			done();
		})
	})
})