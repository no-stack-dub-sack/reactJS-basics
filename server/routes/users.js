import express from 'express';
import validateInput from '../shared/validations/signup.js';
import bcrypt from 'bcrypt';

import User from '../models/user';

let router = express.Router();

router.post('/', (req, res) => {
  const { errors, isValid } = validateInput(req.body);
  
  if(isValid) {
    const { username, email, password, timezone } = req.body;
    const password_digest = bcrypt.hashSync(password, 10);
    
    User.forge({
      username, email, password_digest, timezone 
    }, { hasTimestamps: true }).save()
      .then(user => res.json({ success: true }))
      .catch(err => res.status(500).json({ error: err }))
    
  } else {
    res.status(400).json(errors);
  }
});

export default router;