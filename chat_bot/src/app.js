import http from 'http'
import {env, port, ip, apiRoot} from './config'
import express from './services/express'
import api from './api'
import {stooqSearch, stooqSearchResponses} from "./services/rsmq";

const app = express(apiRoot, api);
const server = http.createServer(app);

stooqSearch.start();
stooqSearchResponses.start();

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
});

export default app
