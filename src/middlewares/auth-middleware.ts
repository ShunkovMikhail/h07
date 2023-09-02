import { NextFunction, Request, Response } from 'express'
import { jwtService } from '../application/jwt-service'
import { usersQueryRepo } from '../repositories/query/users-query-repository'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]
        const userId = await jwtService.verifyToken(token)
            if (userId) {
            req.user = await usersQueryRepo.getDataById(userId)
            next()
        } else {
                res.sendStatus(401)
            }
    } else {
        res.sendStatus(401)
    }
}