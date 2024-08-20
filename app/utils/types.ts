export interface User {
  avatarUrl: string
  bio: string | null
  createdAt: string
  followers: { totalCount: number }
  following: { totalCount: number }
  login: string
  name: string | null
  pronouns: string | null
  repositories: { totalCount: number }
  url: string
}
