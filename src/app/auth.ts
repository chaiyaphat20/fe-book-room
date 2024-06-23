import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signInApi } from './services/auth-service'
import { SigInType } from './models/auth-model'

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }
        const body: SigInType = { email, password }
        try {
          console.log({ body })
          const response = await signInApi(body)
          console.log({ response: response._id })
          const { firstName, lastName, email, _id } = response
          if (firstName) {
            return {
              id: _id,
              name: `${firstName} ${lastName}`,
              email,
            }
          }
        } catch (error: any) {
          console.error(error.message)
          return null
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.email) {
        token.name = user.name
        token.email = user.email
        token.id = user.id
        return token
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.name = token.name
      session.user.id = token.id
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default authOptions
