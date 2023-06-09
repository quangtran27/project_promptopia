import { Schema, model, models } from 'mongoose'

export interface User {
  _id: string
  email: string
  username: string
  image: string
  __v: number
}

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  image: { type: String, required: true },
})

const UserModel = models.User || model<User>('User', userSchema)
export default UserModel
