const User = require('../models/user')

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
    res.json({ success: 'true'})
}
