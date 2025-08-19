import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchUserRepos } from './api';

describe('fetchUserRepos (GraphQL v4)', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it('returns empty array when username is empty and does not call fetch', async () => {
    const spy = vi.spyOn(globalThis, 'fetch' as any);
    const result = await fetchUserRepos('');
    expect(result).toEqual([]);
    expect(spy).not.toHaveBeenCalled();
  });

  it('throws when token is missing', async () => {
    // Ensure no token is present
    vi.unstubAllEnvs();
    await expect(fetchUserRepos('octocat')).rejects.toThrow(
      /Missing GitHub token/i
    );
  });

  it('sends correct GraphQL body and maps response to Repository shape', async () => {
    vi.stubEnv('VITE_GITHUB_TOKEN', 'test-token');

    const mockResponse = {
      data: {
        user: {
          repositories: {
            nodes: [
              {
                databaseId: 123,
                name: 'repo-one',
                description: 'First',
                url: 'https://github.com/u/repo-one',
                primaryLanguage: { name: 'TypeScript' },
                stargazerCount: 10,
                forkCount: 2,
                updatedAt: '2024-01-01T00:00:00Z',
                isArchived: false,
              },
              {
                // This one should be filtered out due to null databaseId
                databaseId: null,
                name: 'no-id',
                description: null,
                url: 'https://github.com/u/no-id',
                primaryLanguage: null,
                stargazerCount: 0,
                forkCount: 0,
                updatedAt: '2024-01-02T00:00:00Z',
                isArchived: false,
              },
            ],
          },
        },
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchUserRepos('octocat');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.github.com/graphql');
    expect(init.method).toBe('POST');
    expect(init.headers.Authorization).toBe('Bearer test-token');

    const parsedBody = JSON.parse(init.body);
    expect(parsedBody.variables.login).toBe('octocat');
    expect(typeof parsedBody.query).toBe('string');

    expect(result).toEqual([
      {
        id: 123,
        name: 'repo-one',
        description: 'First',
        html_url: 'https://github.com/u/repo-one',
        language: 'TypeScript',
        stargazers_count: 10,
        forks_count: 2,
        updated_at: '2024-01-01T00:00:00Z',
        archived: false,
      },
    ]);
  });

  it('throws when GraphQL returns errors array', async () => {
    vi.stubEnv('VITE_GITHUB_TOKEN', 'test-token');
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ errors: [{ message: 'Something went wrong' }] }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchUserRepos('octocat')).rejects.toThrow('Something went wrong');
  });

  it('throws when user is not found', async () => {
    vi.stubEnv('VITE_GITHUB_TOKEN', 'test-token');
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { user: null } }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchUserRepos('unknown-user')).rejects.toThrow('User not found');
  });

  it('throws HTTP error message from response body when non-OK', async () => {
    vi.stubEnv('VITE_GITHUB_TOKEN', 'test-token');
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Bad credentials' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchUserRepos('octocat')).rejects.toThrow('Bad credentials');
  });
});

// Removed legacy REST-based tests
