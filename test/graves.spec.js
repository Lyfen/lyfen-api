import assert from 'assert';
import request from 'request';
import should from 'should';

describe('Graves Routes', () => {
	let grahamID;

	before(()=> {
		let date = new Date();
		let thirtyTwoYearsAgo = date.setDate(date.getDate()-(365.25*32)) 
		let graham = {
			username: 'graham',
			email: 'grahamtest@example.com',
			dateOfBirth: thirtyTwoYearsAgo
		}
		// insert Graham
		request.post('http://localhost:1701/users', graham, (err, res, body) => {
				grahamID = body.id
		    });
			// insert actuarial data
		// insert James
			// insert actuarial data
	})
	after(()=> {
		request.delete('http://localhost:1701/users/' + grahamID, (err, res, body) => {
			});
	})
	it('should return accurate grave data', done => {
		request.get('http://localhost:1701/graves/' + grahamID, (err, res, body) => {
			assert.equal(JSON.parse(body).deathProbabilityPercentage, 0.2123);
			done();
		})
	})
})