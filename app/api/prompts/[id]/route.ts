import { IUserResponse } from '@interfaces/response'
import PromptModel from '@models/prompt'
import { connectDB } from '@utils/database'
import { NextApiRequest } from 'next'
import { getSession } from 'next-auth/react'

export const GET = async (req: Request, res: IUserResponse) => {
  const id = res.params.id
  try {
    if (!id)
      return new Response(JSON.stringify('Prompt id is invalid'), {
        status: 400,
      })

    await connectDB()
    const prompt = await PromptModel.findById(id).populate('creator')
    if (!prompt) {
      return new Response(JSON.stringify('Prompt not found'), { status: 404 })
    }
    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (e) {
    console.log(e)
    return new Response(JSON.stringify('Failed to fetch prompt'), {
      status: 500,
    })
  }
}

export const PATCH = async (req: Request, res: IUserResponse) => {
  const id = res.params.id
  const { prompt, tag } = await req.json()
  if (!id)
    return new Response(JSON.stringify('Prompt id is invalid'), {
      status: 400,
    })
  try {
    await connectDB()
    const existingPrompt = await PromptModel.findById(id).populate('creator')
    if (!existingPrompt) {
      return new Response(JSON.stringify('Prompt not found'), { status: 404 })
    }

    existingPrompt.promp = prompt
    existingPrompt.tag = tag
    existingPrompt.save()

    return new Response(JSON.stringify('Prompt was updated'), { status: 200 })
  } catch (e) {
    console.log(e)
    return new Response(JSON.stringify('Faild to fetch prompt'), {
      status: 500,
    })
  }
}

export const DELETE = async (req: Request, res: IUserResponse) => {
  const id = res.params.id
  if (!id)
    return new Response(JSON.stringify('Prompt id is invalid'), {
      status: 400,
    })

  try {
    await connectDB()
    await PromptModel.findByIdAndRemove(id)
    return new Response(JSON.stringify('Prompt was deleted'), { status: 200 })
  } catch (e) {
    console.log(e)
    return new Response(JSON.stringify('Faild to fetch prompt'), {
      status: 500,
    })
  }
}
