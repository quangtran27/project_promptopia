import { IUserResponse } from '@interfaces/response'
import UserModel from '@models/user'
import { connectDB } from '@utils/database'

export const GET = async (req: Request, res: IUserResponse) => {
  try {
    const id = res.params.id
    if (id) {
      await connectDB()
      const user = await UserModel.findById(id)
      return new Response(JSON.stringify(user), { status: 200 })
    }

    return new Response(JSON.stringify([]), { status: 404 })
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify('Faild to fetch user'), {
      status: 500,
    })
  }
}
