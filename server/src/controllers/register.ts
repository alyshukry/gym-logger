import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import { isEmail, isStrongPassword } from 'validator'
import createHttpError, { HttpError } from 'http-errors'
import prisma from '../utils/prisma'
import { signAccessToken, signRefreshToken } from '../utils/jwt'

export const registerController = async (req: Request, res: Response) => {
    try {
        let { email, username, password } = req.body

        email = email.trim()
        username = username.trim().toLowerCase()

        if (!email || !username || !password)
            throw createHttpError(400, 'Missing field')
        if (!isEmail(email))
            throw createHttpError(400, 'Invalid email')
        if (!/^[a-zA-Z0-9_]{3,20}$/.test(username))
            throw createHttpError(400, 'Invalid username')
        if (!isStrongPassword(password))
            throw createHttpError(400, 'Weak password')

        const hashedPassword = await bcryptjs.hash(password, 10)

        const user = await prisma.user.create({
            data: { email, username, password: hashedPassword }
        })

        res.cookie('refreshToken', signRefreshToken(user.id), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(201).json({
            message: 'User registered successfully',
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