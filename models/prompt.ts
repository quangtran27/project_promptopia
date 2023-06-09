import UserModel, { User } from '@models/user'
import { Schema, model, models } from 'mongoose'

export interface Prompt {
  _id: string
  creator: User
  prompt: string
  tag: string
  __v: number
}

const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
  },
  prompt: { type: String, required: true },
  tag: { type: String, required: true },
})

const PromptModel = models.Prompt || model<Prompt>('Prompt', promptSchema)

export default PromptModel
