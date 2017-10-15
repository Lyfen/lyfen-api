import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import morgan from 'morgan'
import passport from 'passport'
import flash from 'connect-flash'

const app = express()
const PORT = process.env.PORT || 1701
const db = require("./models")
const middleware = require('./middleware')

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport)

app.use('/', middleware)
app.use(require('./controllers'))

db.sequelize.sync().then(function() {
  app.listen(PORT, () => {
    console.log(`The magic happens on port ${PORT}`);
  })
})