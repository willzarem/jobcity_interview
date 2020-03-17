import request from 'request';
import {csv} from 'csvtojson';
import {stooqSearch} from '../services/rsmq/index';
import {stooqSearchResponses} from "../services/rsmq";

const API_BASE_URL = 'https://stooq.com/q/l/?f=sd2t2ohlcv&h&e=csv&s=';

const StooqSearchWorker = (message, next, id) => {
  console.log(`RECEIVED MESSAGE ${id}`, message);
  csv()
    .fromStream(request.get(API_BASE_URL + message))
    .subscribe((json) => {
      stooqSearchResponses.send({
        successful: true,
        message: json.Close === 'N/D' ? 'Stock quote not found. :(' : `${json.Symbol} quote is $${json.Close} per share.`,
        rawResponse: json
      });
    }, (onError) => {
      console.error(onError);
      stooqSearch.del(id);
    }, (onComplete) => {
      console.log('complete', onComplete);
      stooqSearch.del(id);
    });
};

export {StooqSearchWorker};
