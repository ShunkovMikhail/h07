import { DB } from './mongo-db'
import { CommentInputModel, CommentViewModel } from '../types/models'

export const commentsRepo = {

    async create(input: CommentViewModel) {
        await DB.create('comments', input)
    },

    async update(id: string, input: CommentInputModel) {
        await DB.update('comments', id, input)
    },

    async delete(id: string): Promise<number> {
        return DB.delete('comments', id)
    },

    async newID(): Promise<string> {
        return DB.generateUUID()
    },

}


