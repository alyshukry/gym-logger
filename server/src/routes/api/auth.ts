import express from 'express'
import { registerController } from '../../controllers/api/register'
import { loginController } from '../../controllers/api/login'
import { refreshController } from '../../controllers/api/refresh'

export const apiRouter = express.Router()

apiRouter.post('/register', registerController)
apiRouter.post('/login', loginController)
apiRouter.post('/refresh', refreshController)