import { Request, Response } from 'express'

export const registerController = (req: Request, res: Response) => {
    res.json('register')
}