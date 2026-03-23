import express from 'express'
import { authenticate } from '../../middleware/auth'
import { createSessionController } from '../../controllers/api/sessions/create'
import { deleteSessionController } from '../../controllers/api/sessions/delete'
import { getSessionController, getSessionsController } from '../../controllers/api/sessions/get'
import { updateSessionController } from '../../controllers/api/sessions/update'

export const sessionsRouter = express.Router()

sessionsRouter.post('/', authenticate, createSessionController)
sessionsRouter.get('/:session', authenticate, getSessionController)
sessionsRouter.get('/', authenticate, getSessionsController)
sessionsRouter.delete('/:session', authenticate, deleteSessionController)
sessionsRouter.patch('/:session', authenticate, updateSessionController)

import { createSetController } from '../../controllers/api/sessions/sets/create'
import { getSetController, getSetsController } from '../../controllers/api/sessions/sets/get'
import { updateSetController } from '../../controllers/api/sessions/sets/update'
import { deleteSetController } from '../../controllers/api/sessions/sets/delete'

sessionsRouter.post('/:session/sets/', authenticate, createSetController)
sessionsRouter.get('/:session/sets/:set', authenticate, getSetController)
sessionsRouter.get('/:session/sets/', authenticate, getSetsController)
sessionsRouter.patch('/:session/sets/:set', authenticate, updateSetController)
sessionsRouter.delete('/:session/sets/:set', authenticate, deleteSetController)