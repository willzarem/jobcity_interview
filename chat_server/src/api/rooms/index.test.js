import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Rooms } from '.'

const app = () => express(apiRoot, routes);

let rooms;

beforeEach(async () => {
  rooms = await Rooms.create({})
});

test('POST /rooms 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ topic: 'test', joined: 'test' });
  expect(status).toBe(201);
  expect(typeof body).toEqual('object');
  expect(body.topic).toEqual('test');
  expect(body.joined).toEqual('test')
});

test('GET /rooms 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`);
  expect(status).toBe(200);
  expect(Array.isArray(body.rows)).toBe(true);
  expect(Number.isNaN(body.count)).toBe(false)
});

test('GET /rooms/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${rooms.id}`);
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(rooms.id)
});

test('GET /rooms/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456');
  expect(status).toBe(404)
});

test('PUT /rooms/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${rooms.id}`)
    .send({ topic: 'test', joined: 'test' });
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(rooms.id);
  expect(body.topic).toEqual('test');
  expect(body.joined).toEqual('test')
});

test('PUT /rooms/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ topic: 'test', joined: 'test' });
  expect(status).toBe(404)
});
