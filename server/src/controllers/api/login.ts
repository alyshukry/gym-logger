import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import createHttpError, { HttpError } from 'http-errors'
import prisma from '../../utils/prisma'
import { signAccessToken, signRefreshToken } from '../../utils/jwt'

export const loginController = async (req: Request, res: Response) => {
    try {
        let { username, password } = req.body

        username = username.trim().toLowerCase()

        if (!username || !password)
            throw createHttpError(400, 'Missing field')

        const user = await prisma.user.findUnique({
            where: { username }
        })
        if (!user)
            throw createHttpError(401, 'Invalid credentials')

        const correctPassword = await bcryptjs.compare(password, user.password)
        if (!correctPassword)
            throw createHttpError(401, 'Invalid credentials')

        res.cookie('refreshToken', signRefreshToken(user.id), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            message: 'Logged in successfully',
            token: signAccessToken(user.id),
            id: user.id,
            username: user.username,
            email: user.email
        })
    }
    catch (err) {
        if (err instanceof HttpError)
            res.status(err.status).json({ message: err.message })
        else
            res.status(500).json({ message: 'Internal server error' })
    }
}