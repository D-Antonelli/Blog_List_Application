const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const logger = require('../utils/logger');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { body } = request;
  logger.info(body);
  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(body.passwordHash, saltRounds);

  const newUser = {
    username: body.username,
    name: body.name,
    passwordHash,
  };

  const user = new User(newUser);
  const result = await user.save();
  response.status(201).json(result);
});

module.exports = usersRouter;
