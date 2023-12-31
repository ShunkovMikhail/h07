import express, { Request, Response } from 'express'
import { DB } from './repositories/mongo-db'
import { blogsRouter } from './application/routes/blogsRouter'
import { postsRouter } from './application/routes/postsRouter'
import { authRouter } from './application/routes/authRouter'
import { usersRouter } from './application/routes/usersRouter'
import { commentsRouter } from './application/routes/commentsRouter'

export let baseUrl = ''

export const serverApp = (port: number) => {
    const app = express()

    app.use(express.json())

    app.get('/', (req: Request, res: Response) => {
        baseUrl = req.protocol + '://' + req.hostname
        res.sendStatus(204)
    })

    app.delete('/testing/all-data', async (req: Request, res: Response) => {
        res.sendStatus(await DB.clear())
    })

    app.use('/blogs', blogsRouter)
    app.use('/posts', postsRouter)
    app.use('/auth', authRouter)
    app.use('/users', usersRouter)
    app.use('/comments', commentsRouter)

    app.listen(port, () => {
        console.log('Example app listening on port ' + port)
    })
}


