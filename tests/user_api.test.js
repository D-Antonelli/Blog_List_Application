const mongoose = require('mongoose');
const supertest = require('supertest');
const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);
const router = '/api/users';

beforeEach(async () => {
  await User.deleteMany({});
});

describe('can add a new user with correct format', () => {
  test('add a new user', async () => {
    const newUser = {
      username: 'uruk-hai',
      passwordHash: '123456',
      name: 'lady',
    };
    const count = await User.countDocuments({});
    await request(app).post(router).send(newUser);
    const newCount = await User.countDocuments({});
    expect(newCount).toBe(count + 1);
  });
});

describe('both username and password should be given', () => {
  test('both empty username and empty password returns 400', async () => {
    const newUser = {
      username: '',
      passwordHash: '',
      name: 'lady',
    };
    const response = await request(app).post(router).send(newUser);
    expect(response.statusCode).toBe(400);
    console.log(response.body);
  });

  test('empty username results in 400', async () => {
    const newUser = {
      username: '',
      passwordHash: '123',
      name: 'amy',
    };
    const response = await request(app).post(router).send(newUser);
    expect(response.statusCode).toBe(400);
    console.log(response.body);
  });

  test('empty password results in 400', async () => {
    const newUser = {
      username: 'flower',
      passwordHash: '',
      name: 'amy',
    };
    const response = await request(app).post(router).send(newUser);
    expect(response.statusCode).toBe(400);
    console.log(response.body);
  });
});

describe('Both username and password must be at least 3 characters long', () => {
  test('Username less than 3 characters long results in 400', async () => {
    const newUser = {
      username: 'fl',
      passwordHash: '12345',
      name: 'amy',
    };
    const response = await request(app).post(router).send(newUser);
    expect(response.statusCode).toBe(400);
    console.log(response.body);
  });

  test('Password less than 3 characters long results in 400', async () => {
    const newUser = {
      username: 'flower',
      passwordHash: '12',
      name: 'amy',
    };
    const response = await request(app).post(router).send(newUser);
    expect(response.statusCode).toBe(400);
    console.log(response.body);
  });

  test.only('Both username and password less than 3 characters long results in 400', async () => {
    const newUser = {
      username: 'fl',
      passwordHash: '12',
      name: 'amy',
    };
    const response = await request(app).post(router).send(newUser);
    expect(response.statusCode).toBe(400);
    console.log(response.body);
  });
});

describe('username must be unique', () => {
  test.only('username not unique results in 400', async () => {
    const newUser1 = {
      username: 'unique-name',
      passwordHash: '123456',
      name: 'lady',
    };

    await request(app).post(router).send(newUser1);

    const newUser2 = {
      username: 'unique-name',
      passwordHash: '123456',
      name: 'lady',
    };
    const response = await request(app).post(router).send(newUser2);
    expect(response.statusCode).toBe(400);
    console.log(response.body);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
