import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Users } from '.'

const app = () => express(apiRoot, routes);

let users;

beforeEach(async () => {
  users = await Users.create({})
});

test('POST /users 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', rooms: 'test', avatar: 'test', type: 'test' });
  expect(status).toBe(201);
  expect(typeof body).toEqual('object');
  expect(body.name).toEqual('test');
  expect(body.rooms).toEqual('test');
  expect(body.avatar).toEqual('test');
  expect(body.type).toEqual('test')
});

test('GET /users 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`);
  expect(status).toBe(200);
  expect(Array.isArray(body.rows)).toBe(true);
  expect(Number.isNaN(body.count)).toBe(false)
});

test('GET /users/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${users.id}`);
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(users.id)
});

test('GET /users/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456');
  expect(status).toBe(404)
});

test('PUT /users/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${users.id}`)
    .send({ name: 'test', rooms: 'test', avatar: 'test', type: 'test' });
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(users.id);
  expect(body.name).toEqual('test');
  expect(body.rooms).toEqual('test');
  expect(body.avatar).toEqual('test');
  expect(body.type).toEqual('test')
});

test('PUT /users/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', rooms: 'test', avatar: 'test', type: 'test' });
  expect(status).toBe(404)
});
