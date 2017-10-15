import path from 'path'
import passport from 'passport'

const db = require('../../models');

module.exports = (passport) => {
  passport.serializeUser((user, done)=> {
    done(null, user)
  })
  passport.deserializeUser((id, done) => {
    db.Users.findById(id, (err, user) => {
      done(err, user)
    })
  })

  //load strategy files
  require(path.join(__dirname, 'local'));
  //TODO: Facebook
  //TODO: Twitter
  //TODO: Google
}