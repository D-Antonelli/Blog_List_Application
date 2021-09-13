const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const logger = require('../utils/logger');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

/**
 * TODO: 4.16*: bloglist expansion, step4
 * USERNAME MUST BE UNIQUE
 * ADD SUITABLE TESTS
 */

usersRouter.post('/', async (request, response) => {
  const { body } = request;

  if (!body.passwordHash) {
    response.status(400).json('Error: password is required');
  } else if (body.passwordHash.length < 3) {
    response.status(400).json('Invalid password: min length is 3');
  } else if (typeof body.username !== 'string') {
    response.status(400).json('Invalid username: must be string');
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.passwordHash, saltRounds);

    const newUser = {
      username: body.username,
      name: body.name,
      passwordHash,
    };
    const user = new User(newUser);
    const error = user.validateSync();
    try {
      const result = await user.save();
      response.status(201).json(result);
    } catch (err) {
      response.status(400).json(error.errors);
    }
  }
});

module.exports = usersRouter;
