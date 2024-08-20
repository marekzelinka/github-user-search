import { GraphqlResponseError, graphql } from '@octokit/graphql'
import invariant from 'tiny-invariant'
import type { User } from '~/utils/types'

invariant(process.env.GITHUB_API_TOKEN, 'Missing GITHUB_API_TOKEN env var')

const client = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_API_TOKEN}`,
  },
})

const GET_USER_QUERY = /* GraphQL */ `
  query ($login: String!) {
    user(login: $login) {
      avatarUrl
      bio
      company
      createdAt
      email
      followers {
        totalCount
      }
      following {
        totalCount
      }
      location
      login
      name
      pronouns
      repositories {
        totalCount
      }
      twitterUsername
      url
      websiteUrl
    }
  }
`

export async function getUserByLogin(login: string) {
  try {
    const { user } = await client<{ user: User }>(GET_USER_QUERY, { login })

    return user
  } catch (error) {
    if (error instanceof GraphqlResponseError) {
      const notFound = error.errors?.find((error) => error.type === 'NOT_FOUND')

      if (notFound) {
        return null
      }

      throw new Error(error.errors?.[0].message)
    }

    throw error
  }
}
