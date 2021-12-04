const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;

  const user = await User.findOne({});

  if (!body.title && !body.url) {
    response.status(400).json();
  } else {
    const post = body.likes ? body : { ...body, likes: 0 };
    post.user = user.id;
    const blog = new Blog(post);
    const result = await blog.save();
    response.status(201).json(result);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const result = await Blog.findByIdAndRemove(id);
  if (result) {
    response.status(204).end();
  } else {
    response.status(404).json();
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(updatedBlog);
  } catch (err) {
    logger.info(err);
  }
});

module.exports = blogsRouter;
