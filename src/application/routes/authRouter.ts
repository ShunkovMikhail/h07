import {confirmationCodeVdChain, emailVdChain, loginVdChain, registrationVdChain} from '../../inputValidation'
import {
    APIErrorResult,
    LoginInputModel,
    LoginSuccessViewModel,
    MeViewModel,
    RegistrationConfirmationCodeModel,
    RegistrationEmailResending,
    TypeOfRequestBody,
    TypeOfRequestQuery,
    UserInputModel
} from '../../types/models'
import { Request, Response, Router } from 'express'
import { Result, validationResult } from 'express-validator'
import { ErrorMapper } from '../../utils/errorMapper'
import { usersService } from '../../domain/users-service'
import { jwtService } from '../jwt-service'
import { authMiddleware } from '../../middlewares/auth-middleware'
import { unconfirmedUsersService } from '../../domain/unconfirmed-users-service'

export const authRouter = Router({})

authRouter.post('/login', loginVdChain, async (req: TypeOfRequestBody<LoginInputModel>, res: Response<LoginSuccessViewModel | APIErrorResult>) => {

    const result: Result = validationResult(req);

    if (result.isEmpty()) {
        const user = await usersService.authenticate(req)
        if (user) {
            res.status(200).json({accessToken: await jwtService.createToken(user)})
        } else {
            res.sendStatus(401)
        }
    } else {
        res.status(400).json(await ErrorMapper(result))
    }
})



authRouter.get('/me', authMiddleware, async (req: Request, res: Response<MeViewModel | null>) => {

    const me: MeViewModel = {
        email: req.user!.email,
        login: req.user!.login,
        userId: req.user!.id
    }
        res.status(200).json(me)
})



authRouter.post('/registration', registrationVdChain, async (req: TypeOfRequestBody<UserInputModel>, res: Response) => {

    const result: Result = validationResult(req)

    if (result.isEmpty()) {
        res.sendStatus(await usersService.register(req))
    } else {
        res.status(400).json(await ErrorMapper(result))
    }
})



authRouter.post('/registration-confirmation', confirmationCodeVdChain, async (req: TypeOfRequestBody<RegistrationConfirmationCodeModel>, res: Response) => {

    const result: Result = validationResult(req)

    if (result.isEmpty()) {
        res.sendStatus(204)
    } else {
        res.status(400).json(await ErrorMapper(result))
    }
})



authRouter.post('/registration-email-resending', emailVdChain, async (req: TypeOfRequestBody<RegistrationEmailResending>, res: Response) => {

    const result: Result = validationResult(req)

    if (result.isEmpty()) {
        res.sendStatus(204)
    } else {
        res.status(400).json(await ErrorMapper(result))
    }
})



authRouter.get('/confirm-email', async (req: TypeOfRequestQuery<{ code: string }>, res: Response) => {

    await unconfirmedUsersService.confirm(req.query.code)
    res.sendStatus(200)
})


