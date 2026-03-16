import jwt from 'jsonwebtoken'

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!

export const signAccessToken = (userId: number) => {
    return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: '15m' })
}

export const signRefreshToken = (userId: number) => {
    return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' })
}

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, ACCESS_SECRET) as { userId: number }
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_SECRET) as { userId: number }
}