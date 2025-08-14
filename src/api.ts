const GITHUB_API_BASE = 'https://api.github.com';

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