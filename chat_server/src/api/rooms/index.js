import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create as createRoom, index as indexRoom, show as showRoom, update as updateRoom } from './controller'
import { create as createMessages, index as indexMessages } from '../messages/controller'
import { schema } from './model'
export Rooms, { schema } from './model'

const router = new Router();

/**
 * @api {post} /rooms Create rooms
 * @apiName CreateRooms
 * @apiGroup Rooms
 * @apiParam topic Rooms's topic.
 * @apiParam joined Rooms's joined.
 * @apiSuccess {Object} rooms Rooms's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rooms not found.
 */
router.post('/',
  createRoom);

/**
 * @api {get} /rooms Retrieve rooms
 * @apiName RetrieveRooms
 * @apiGroup Rooms
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of rooms.
 * @apiSuccess {Object[]} rows List of rooms.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  indexRoom);

/**
 * @api {get} /rooms/:id Retrieve rooms
 * @apiName RetrieveRooms
 * @apiGroup Rooms
 * @apiSuccess {Object} rooms Rooms's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rooms not found.
 */
router.get('/:id',
  showRoom);

/**
 * @api {put} /rooms/:id Update rooms
 * @apiName UpdateRooms
 * @apiGroup Rooms
 * @apiParam topic Rooms's topic.
 * @apiParam joined Rooms's joined.
 * @apiSuccess {Object} rooms Rooms's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rooms not found.
 */
router.put('/:id',
  updateRoom);

/**
 * @api {post} /messages Create messages
 * @apiName CreateMessages
 * @apiGroup Messages
 * @apiParam roomId Messages's roomId.
 * @apiParam userId Messages's userId.
 * @apiParam body Messages's body.
 * @apiSuccess {Object} messages Messages's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Messages not found.
 */
router.post('/:roomId/messages',
  createMessages);

/**
 * @api {get} /messages Retrieve messages
 * @apiName RetrieveMessages
 * @apiGroup Messages
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of messages.
 * @apiSuccess {Object[]} rows List of messages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/:roomId/messages',
  query(),
  indexMessages);

export default router
