const jwt = require('jwt-simple')
const config = require('../config')
const User = require('../models/user')


function tokenForUser(user) {
  const timestamp = new Date().getTime()
  // use jwt, it has a sub (subject) property which in this case, is the user
  // iat = issued at time
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret)
}
exports.signup = async function(req, res, next) {

  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and a password' })
  }
  
  const existingUser = await User.findOne({ email })
    
    if (existingUser) { 
      return res.status(422).send({ error: 'Email is already in use' })
    }
    
    let newUser = new User({ email, password })
    
    try {
      await newUser.save()
    } catch(err) {
      return next(err)
    }
    res.json({ token: tokenForUser(newUser) })
}

exports.signin = async function(req, res, next) {
  // user has already had their email/pw auth'd, just need to give them a token
  res.send({ token: tokenForUser(req.user) })
}
