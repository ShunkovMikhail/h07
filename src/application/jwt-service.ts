import jwt from 'jsonwebtoken'
import { UserDataModel } from '../types/models'
import { jwtSecret } from '../envVar'

export const jwtService = {
    async createToken(user: UserDataModel): Promise<string> {
        return jwt.sign({userId: user.id}, jwtSecret, {expiresIn: '5m'})
    },

    async verifyToken(token: string): Promise<string | null> {
        try {
            const result: any = jwt.verify(token, jwtSecret)
            return result.userId
        } catch (e) {
            return null
        }
    }
}