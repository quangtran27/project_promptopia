import { Prompt } from '@models/prompt'
import { User } from '@models/user'

export const emptyUser: User = {
  _id: '',
  email: '',
  username: '',
  image: '',
  __v: 0,
}

export const emptyPrompt: Prompt = {
  _id: '',
  creator: emptyUser,
  prompt: '',
  tag: '',
  __v: 0,
}
