const Config = {
  backendApiURL: process.env.NEXT_PUBLIC_BACKEND_API_URL!,
  githubClientID: process.env.GITHUB_CLIENT_ID!,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET!,
  mongodbDatabase: process.env.MONGODB_DB!,
  mongodbURI: process.env.MONGODB_URI!,
  nextAuthURL: process.env.NEXTAUTH_URL!,
}

export default Config
