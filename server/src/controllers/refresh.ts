import { Request, Response } from 'express'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt'

export const refreshController = (req: Request, res: Response) => {
    try {
        const payload = verifyRefreshToken(req.cookies.refreshToken)

        if (payload) {
            res.cookie('refreshToken', signRefreshToken(payload.userId), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.status(200).json({ token: signAccessToken(payload.userId) })
        }
    }
    catch(err) {
        res.status(401).json({ message: 'Wrong refresh token' })
    }
}