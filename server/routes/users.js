import express from 'express';
import commonValidations from '../shared/validations/signup.js';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';

import User from '../models/user';

let router = express.Router();

function validateInput(data, otherValidatioins) { // calling this in router.post() below
  
  // first perform server side validations (assuming client side validations pass)
  // then, move on to db validations
  let { errors } = otherValidatioins(data); 
  
  // query db to check for uniqueness of user info
  // if no user or email is entered, no user request is made
  // client side validations prevent this
  return User.query({ 
    select: [ 'username', 'email' ],
    where: { email: data.email },
    orWhere: { username: data.username }
  }).fetch().then(user => {
    if (user) {
      // throw errors if username or email already in db
      if (user.get('username') === data.username) {
        errors.username = 'A user with this username already exists'; // see comment below all other code
      }
      if (user.get('email') === data.email) {
        errors.email = 'A user with this email already exists';
      }
    }
    // return errors object and validity (boolean)
    return {
      errors,
      isValid: isEmpty(errors)  
    };
  });
}

router.get('/:identifier', (req, res) => {
  User.query({
    select: [ 'username', 'email' ],
    where: { email: req.params.identifier },
    orWhere: { username: req.params.identifier }
  }).fetch().then(user => {
    res.json({ user });
  });
});

router.post('/', (req, res) => {
  // once this functions return errors obj and bool, determine how to proceed in then()
  // either save new user and database and proceed
  // or responsd with errors object
  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if(isValid) {
      const { username, email, password, timezone } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);
      
      User.forge({
        username, email, password_digest, timezone 
      }, { hasTimestamps: true }).save()
      .then(user => res.json({ success: true }))
      .catch(err => res.status(500).json({ error: err }))
      
    } else {
      // respond with errors 
      res.status(400).json(errors);
    }
  });
  
});

export default router;

// function validateInput(data, otherValidatioins) {
//   let { errors } = otherValidatioins(data);
//   
//   return Promise.all([
//     User.where({ email: data.email }).fetch().then(user => {
//       if (user) { errors.email = 'Your email already exists' };
//     }),
//     User.where({ username: data.username }).fetch().then(user => {
//       if (user) { errors.username = 'This username already exists' };    <======= Less desireable approach, 2 queries to DB instead on one
//     })
//   ]).then(() => {
//     return {
//       errors,
//       isValid: isEmpty(errors)  
//     };
//   });
// }  