import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

const db = require('../../models')

module.exports = passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log('local strategy called');
    let options = {
      where: {
        username: username
      }
    }

    db.Users.findOne(options).then(user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // TODO: Verify Password!
      return done(null, user)
    })
  }
))
