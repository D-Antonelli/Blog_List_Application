const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;

  if (!body.title && !body.url) {
    response.status(400).json();
  } else {
    const post = body.likes ? body : { ...body, likes: 0 };
    const blog = new Blog(post);
    const result = await blog.save();
    response.status(201).json(result);
  }
});

module.exports = blogsRouter;
