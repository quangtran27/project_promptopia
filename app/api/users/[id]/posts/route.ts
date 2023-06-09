import { IUserResponse } from '@interfaces/response'
import PromptModel from '@models/prompt'
import { connectDB } from '@utils/database'

export const GET = async (req: Request, res: IUserResponse) => {
  try {
    const id = res.params.id
    if (id) {
      await connectDB()
      const prompts = await PromptModel.find({
        creator: id,
      }).populate('creator')
      return new Response(JSON.stringify(prompts), { status: 200 })
    }

    return new Response(JSON.stringify([]), { status: 404 })
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify('Faild to fetch all prompts'), {
      status: 500,
    })
  }
}
