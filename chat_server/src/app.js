import http from 'http'
import io from 'socket.io';
import {env, mongo, port, ip, apiRoot} from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import {onConnection} from "./services/socket.io";
import api from './api'
import {stooqSearch, stooqSearchResponses} from "./services/rsmq";

const app = express(apiRoot, api);
const server = http.createServer(app);
const socketServer = http.createServer();
export const socket = io(socketServer);

mongoose.connect(mongo.uri);
mongoose.Promise = Promise;

stooqSearch.start();
stooqSearchResponses.start();

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  });

  socketServer.listen(3000, ip, () => {
    console.log('Socket.io server listening on http://%s:%d, in %s mode', ip, 3000, env)
  })
});

socket.on('connection', onConnection);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

export default app
