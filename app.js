const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');

logger.info('connecting to ', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
morgan.token('data', (req) => JSON.stringify(req.body));
app.use(morgan(':data'));
app.use('/api/blogs', blogsRouter);

module.exports = app;
