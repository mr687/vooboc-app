import { Request, Response, NextFunction } from 'express'
import { createError, Error, ErrorType } from './Error'
import { validateDiscordSignature } from './Util'

export function SignatureMiddleware (req: Request, _: Response, next: NextFunction) {
    const isVerified = validateDiscordSignature(req)
    if (!isVerified) {
        throw createError(ErrorType.UNAUTHORIZED, 'Invalid signature')
    }
    else {
        next()
    }
}

export function ErrorMiddleware (err: Error, _: Request, res: Response) {
    res.status(err.status).json(err)
}