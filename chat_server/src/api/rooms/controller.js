import {success, notFound} from '../../services/response/'
import {Rooms} from '.'

export const create = ({body}, res, next) =>
  Rooms.create(body)
    .then((rooms) => rooms.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({querymen: {query, select, cursor}}, res, next) =>
  Rooms.estimatedDocumentCount(query)
    .then(count => Rooms.find(query, select, cursor)
      .then((rooms) => ({
        count,
        rows: rooms.map((rooms) => rooms.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({params}, res, next) =>
  Rooms.findById(params.id)
    .then(notFound(res))
    .then((rooms) => rooms ? rooms.view() : null)
    .then(success(res))
    .catch(next);

export const update = ({bodymen: {body}, params}, res, next) =>
  Rooms.findById(params.id)
    .then(notFound(res))
    .then((rooms) => rooms ? Object.assign(rooms, body).save() : null)
    .then((rooms) => rooms ? rooms.view(true) : null)
    .then(success(res))
    .catch(next);
