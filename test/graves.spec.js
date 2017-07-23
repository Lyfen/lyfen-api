import assert from 'assert';
import request from 'request';
import should from 'should';

describe('Graves Routes', () => {
	before(()=> {
		// insert Graham
			// insert actuarial data
		// insert James
			// insert actuarial data
	})
	after(()=> {
		
	})
	it('should return accurate grave data', done => {
		request.get('http://localhost:1701/graves/1', (err, res, body) => {
			assert.equal(JSON.parse(body).deathProbabilityPercentage, 0.2123);
			done();
		})
	})
})