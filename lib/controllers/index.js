import express from'express'
const router = express.Router();
const users = require('./users');
const graves = require('./graves');
  
router.use('/users', users);
router.use('/graves', graves);
  
module.exports = router;