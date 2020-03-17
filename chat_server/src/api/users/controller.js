import { success, notFound } from '../../services/response/'
import { Users } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Users.create(body)
    .then((users) => users.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Users.estimatedDocumentCount(query)
    .then(count => Users.find(query, select, cursor)
      .then((users) => ({
        count,
        rows: users.map((users) => users.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Users.findById(params.id)
    .then(notFound(res))
    .then((users) => users ? users.view() : null)
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Users.findById(params.id)
    .then(notFound(res))
    .then((users) => users ? Object.assign(users, body).save() : null)
    .then((users) => users ? users.view(true) : null)
    .then(success(res))
    .catch(next);
