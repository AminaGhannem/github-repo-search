const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Fetches public repositories for a given GitHub username.
 * 
 * @param {string} username - The GitHub username to fetch repositories for
 * @param {AbortSignal} [signal] - Optional AbortSignal to cancel the request
 * @returns {Promise<Repository[]>} Promise that resolves to an array of repositories
 * @throws {Error} When the API request fails or returns an error status
 * 
 * @example
 * ```typescript
 * try {
 *   const repos = await fetchUserRepos('octocat');
 *   console.log(`Found ${repos.length} repositories`);
 * } catch (error) {
 *   console.error('Failed to fetch repositories:', error.message);
 * }
 * ```
 */
export async function fetchUserRepos(username: string, signal?: AbortSignal) {
  if (!username.trim()) {
    return [];
  }
  const response = await fetch(`${GITHUB_API_BASE}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
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
  return response.json();
} 