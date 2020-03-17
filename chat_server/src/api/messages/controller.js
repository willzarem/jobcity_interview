import { success, notFound } from '../../services/response/'
import Messages from './model'

export const create = ({ body, params }, res, next) =>
  Messages.create({roomId: params['roomId'], ...body})
    .then((messages) => messages.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Messages.estimatedDocumentCount(query)
    .then(count => Messages.find(query, select, cursor)
      .then((messages) => ({
        count,
        rows: messages.map((messages) => messages.view())
      }))
    )
    .then(success(res))
    .catch(next);
