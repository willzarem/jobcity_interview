import RSMQWorker from 'rsmq-worker'
import {StooqSearchWorker} from '../../api/stooq-search-worker';

const stooqSearch = new RSMQWorker('stooqSearchQueue', {});
const stooqSearchResponses = new RSMQWorker('stooqSearchQueueResponses', {});

stooqSearch.on('message', StooqSearchWorker);

stooqSearch.on('deleted', id => {
  console.log('deleted message id: ' + id)
});

stooqSearch.on('error', (err, msg) => {
  console.error(err);
  stooqSearch.del(msg.id)
});

export {stooqSearch, stooqSearchResponses}
