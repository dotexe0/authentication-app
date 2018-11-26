const passport = require('passport')
const config = require('../config')
const User = require('../models/user')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// set up options for jwt Strat
const jwtOptions = {}

// create JWT strat
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
// tell passport to use this strat
