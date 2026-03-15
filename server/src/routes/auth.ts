import express from 'express'
import { registerController } from '../controllers/register'
import { loginController } from '../controllers/login'

export const apiRouter = express.Router()

apiRouter.get('/register', registerController)
apiRouter.get('/login', loginController)