import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { connectDB } from '@utils/database'
import UserModel from '@models/user'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const sessionUser = await UserModel.findOne({
        email: session.user?.email,
      })
      if (session && session.user) {
        session.user.id = sessionUser.id.toString()
      }

      return session
    },
    async signIn({ user }) {
      await connectDB()
      // Check if user already exists
      const userExists = await UserModel.findOne({ email: user.email })

      // If not, create a new one
      if (!userExists) {
        await UserModel.create({
          email: user.email,
          username: user.name?.replace(' ', '').toLowerCase(),
          image: user.image,
        })
      }

      return true
    },
  },
})

export { handler as GET, handler as POST }
