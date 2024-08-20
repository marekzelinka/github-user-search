export interface User {
  avatarUrl: string
  bio: string | null
  company: string | null
  createdAt: string
  email: string | null
  followers: { totalCount: number }
  following: { totalCount: number }
  location: string | null
  login: string
  name: string | null
  pronouns: string | null
  repositories: { totalCount: number }
  twitterUsername: string | null
  url: string
  websiteUrl: string | null
}
