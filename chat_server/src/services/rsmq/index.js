import RSMQWorker from 'rsmq-worker'
import {socket} from "../../app";

const stooqSearch = new RSMQWorker('stooqSearchQueue', {});
const stooqSearchResponses = new RSMQWorker('stooqSearchQueueResponses', {});

stooqSearchResponses.on('message', (message, next, id) => {
  console.log(`RECEIVED MESSAGE ${id}`, message);
  socket.onconnection((connection) => {
    connection.emit({body: message.message});
  })
});

stooqSearchResponses.on('deleted', id => {
  console.log('deleted message id: ' + id)
});

stooqSearchResponses.on('error', (err, msg) => {
  console.error(err);
  stooqSearchResponses.del(msg.id)
});

export {stooqSearch, stooqSearchResponses}
