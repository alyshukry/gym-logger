import express from 'express'
import { registerController } from '../controllers/register'
import { loginController } from '../controllers/login'
import { refreshController } from '../controllers/refresh'

export const apiRouter = express.Router()

apiRouter.post('/register', registerController)
apiRouter.post('/login', loginController)
apiRouter.post('/refresh', refreshController)