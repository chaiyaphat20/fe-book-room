import 'next-auth'

declare module 'next-auth' {
  interface User {
    name: string
    email: string
    id: string
  }

  interface Session {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    name: string
    email: string
    id: string
  }
}
