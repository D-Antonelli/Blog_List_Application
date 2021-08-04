const mongoose = require('mongoose');
const supertest = require('supertest');
const request = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

/**
 * TODO
 * 4.11*: Blog list tests, step4
 */

const initialBlogs = [
  {
    title: 'How to make a reverse advent calendar',
    author: 'Miss Thrifty',
    url: 'https://www.miss-thrifty.co.uk/how-to-make-a-reverse-advent-calendar/',
    likes: 7,
  },
  {
    title: '$1K 100 Ways: The Book Project 6 Years in the Making',
    author: 'Nick Loper',
    url: 'https://www.sidehustlenation.com/1k-100-ways/',
    likes: 12,
  },
];

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  // array of mongoose objects
  const blogList = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogList.map((item) => item.save());
  await Promise.all(promiseArray);
});

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length);
});

test('all notes are returned in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('id property exists in all posts', async () => {
  const response = await api.get('/api/blogs');
  response.body.forEach((blog) => expect(blog.id).toBeDefined());
});

test('sends a new post successfully', async () => {
  const blog = {
    title: 'How to make a reverse advent calendar',
    author: 'Miss',
    url: 'https://www.miss-thrifty.co.uk/how-to-make-a-reverse-advent-calendar/',
    likes: 15,
  };
  try {
    const count = await Blog.countDocuments({});
    await request(app).post('/api/blogs').send(blog);
    const newCount = await Blog.countDocuments({});
    expect(newCount).toBe(count + 1);
  } catch (err) {
    console.log(err);
  }
});

afterAll(() => {
  mongoose.connection.close();
});
