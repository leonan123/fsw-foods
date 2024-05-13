import NextAuth from 'next-auth/next'

import { authConfig } from '@/app/_lib/auth'

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }
