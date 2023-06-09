import PromptModel from '@models/prompt'
import { connectDB } from '@utils/database'

export const GET = async (req: Request, res: Response) => {
  try {
    await connectDB()
    const prompts = await PromptModel.find({}).populate('creator')

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify('Faild to fetch all prompts'), {
      status: 500,
    })
  }
}

export const POST = async (req: Request, res: Response) => {
  console.log(req)
  const { userId, prompt, tag } = await req.json()

  try {
    await connectDB()
    const newPrompt = new PromptModel({
      creator: userId,
      prompt: prompt,
      tag: tag,
    })

    await newPrompt.save()

    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (err) {
    console.log(err)
    return new Response('Failed to create a new prompt', { status: 500 })
  }
}
