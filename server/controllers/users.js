
const User = require('../models/user');

exports.login = (req, res) => {

  return res.json({message: 'Logging in!'});
}


exports.register = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;

  if (!password || !email) {
    return res.status(422).send({errors: [{title: 'Missing Data', detail: 'Email or password is missing!'}]});
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({errors: [{title: 'Invalid password', detail: 'Password is not maching confirmation password!'}]});
  }

  User.findOne({email}, (error, existingUser) => {
    if (error) {
      return res.status(422).send({errors: [{title: 'DB Error', detail: 'Oooops, something went wrong!'}]});
    }

    if (existingUser) {
      return res.status(422).send({errors: [{title: 'Invalid Email', detail: 'User with provided email already exists!'}]});
    }

    const user = new User({username, email, password});
    user.save((error) => {
      if (error) {
        return res.status(422).send({errors: [{title: 'DB Error', detail: 'Oooops, something went wrong!'}]});
      }

      return res.json({status: 'registered'});
    })
  })
}