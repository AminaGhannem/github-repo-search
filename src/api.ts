import { GraphQlRepo } from "./types";

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

/**
 * Fetches public repositories for a given GitHub username
 * using GitHub's GraphQL v4 API.
 * 
 * Maps the GraphQL response to the app's `Repository` shape.
 * Requires an access token via `VITE_GITHUB_TOKEN`.
 * 
 * @param {string} username - The GitHub username to fetch repositories for
 * @param {AbortSignal} [signal] - Optional AbortSignal to cancel the request
 * @returns {Promise<Repository[]>} Promise that resolves to an array of repositories
 * @throws {Error} When the API request fails or returns an error status
 * 
 * @example
 * ```typescript
 * const repos = await fetchUserRepos('octocat')
 * ```
 */
export async function fetchUserRepos(username: string, signal?: AbortSignal) {
  if (!username.trim()) {
    return [];
  }

  const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
  if (!token) {
    throw new Error('Missing GitHub token. Set VITE_GITHUB_TOKEN in your .env file.');
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        repositories(first: 100, orderBy: { field: UPDATED_AT, direction: DESC }, privacy: PUBLIC) {
          nodes {
            databaseId
            name
            description
            url
            primaryLanguage { name }
            stargazerCount
            forkCount
            updatedAt
            isArchived
          }
        }
      }
    }
  `;

  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    signal,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const data = await response.json();
      if (data && data.message) message = data.message;
    } catch {}
    throw new Error(message);
  }

  

  const payload = await response.json();

  if (payload.errors?.length) {
    const first = payload.errors[0];
    throw new Error(first?.message || 'GraphQL error');
  }

  if (!payload.data?.user) {
    throw new Error('User not found');
  }

  const nodes: GraphQlRepo[] = payload.data.user.repositories?.nodes ?? [];

  return nodes
    .filter(n => n && n.databaseId != null)
}