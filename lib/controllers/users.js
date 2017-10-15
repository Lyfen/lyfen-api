import express from 'express';
import passport from 'passport'
const router = express.Router();
const db = require("../models");
const requireLogin = require('../middleware/requireLogin')

// Get all users
router.get('/', (req, res) => {
	db.Users.findAll({}).then(function(user) {
	    // into the main index, updating the page
	    var obj = {
	      user: user,
	      error: false
	    };
	    return res.json(user);
	  });
})

// Get individual user
router.get('/:userid', (req, res) => {
	db.Users.findById(req.params.userid).then(user => {
		let obj = {
			user,
			error: false,
			userpath: req.params.userid
		}
	  return res.json(obj);
	})
})

// Create new user
router.post('/', (req, res) => {
	console.log(req.body);
	db.Users.create({
	    username: req.body.username,
			email: req.body.email,
			password: req.body.password,
	    dob: req.body.dob,
	    height: req.body.height,
	    weight: req.body.weight,
	    sex: req.body.sex
	  })
	  // pass the result of our call
	  .then(function(user) {
	    return res.json(user)
	  })
	  .catch((err) => res.json(err));
})

// Login 
router.post('/login', passport.authenticate('local'), (req, res) => {
	console.log('authenticated!');
	let options =   {
		where: {
		  	email: req.body.email
		  }
	};
	db.Users.findOne(options).then(user => {
		if (!user) {
			res.json({ error: 'Invalid email or password.' });
		} 
		if (req.body.password === user.password) {
			// sets a cookie with the user's info
			req.session.user = user;
			res.json({'message': 'successful login!'});
		} else {
			res.json({ error: 'Invalid email or password.' });
		}
	});
});

// Update individual user
router.put('/:userid', (req, res) => {

	let options =   {
		where: {
		  	id: req.params.userid
		  }
	};

	db.Users.update(req.body, options)
	  // pass the result of our call
	  .then(function(user) {
	    return res.json(user)
	  });
})

// Delete Individual user
router.delete('/:userid', (req, res) => {
	db.Users.destroy({
		where: {
		  	id: req.params.userid
		  }
		})
	  // pass the result of our call
	  .then(function(user) {
	    return res.json(user)
	  });
})

module.exports = router;