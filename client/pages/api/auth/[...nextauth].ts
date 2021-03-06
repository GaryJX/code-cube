import Config from '@/config/config'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

console.log({
  clientId: Config.githubClientID,
  clientSecret: Config.githubClientSecret,
})

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: Config.githubClientID,
      clientSecret: Config.githubClientSecret,
    }),
    Providers.Google({
      clientId: Config.googleClientID,
      clientSecret: Config.googleClientSecret,
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: Config.mongodbURI,
})
