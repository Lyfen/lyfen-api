import express from'express'
const router = express.Router();
const users = require('./users');
const graves = require('./graves');
const refreshStats = require('./refreshStats');
  
router.use('/users', users);
router.use('/graves', graves);
router.use('/refresh', refreshStats)
  
module.exports = router;