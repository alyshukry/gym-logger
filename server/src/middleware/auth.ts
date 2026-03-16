import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../utils/jwt'
import createHttpError, { HttpError } from 'http-errors'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization)
            throw createHttpError(400, 'Couldn\'t find token')

        const token: string = req.headers.authorization.split(' ')[1]

        const payload = verifyAccessToken(token)
        req.user = { id: payload.userId }

        next()
    }
    catch (err) {
        if (err instanceof HttpError)
            res.status(err.status).json({ message: err.message })
        else res.status(500).json({ message: 'Internal server error' })
    }
}