const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const logger = require('../utils/logger');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(users);
});

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
      blogs: [],
    };
    const user = new User(newUser);
    try {
      user.validateSync();
      const result = await user.save();
      response.status(201).json(result);
    } catch (err) {
      response.status(400).json(err);
    }
  }
});

module.exports = usersRouter;
