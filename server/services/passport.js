const passport = require('passport')
const config = require('../config')
const User = require('../models/user')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy

// create local strategy for login (not signup)
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // verify usr / pw, call done with user
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err)
    }
    
    if (!user) {
      return done(null, false)
    }
    
    // compare passwords - is pw equal to user.pw ?
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err)
      }
      if (!isMatch) {
        return done(null, false)
      }
      
      return done(null, user)
    })
  })
})

// set up options for jwt Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

// create JWT strategy
// payload is the jwt token (i.e. will hae obj with sub and iat properties)
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  /// see if user Id in the payload exists in our db
  // if yes call 'done'
  // otherwise call done without the user object
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false)
    }
    
    if (user) {
      done(null, user)
    }
    
    else {
      done(null, false)
    }
  })
})
// tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)
