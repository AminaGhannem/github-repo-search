import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchUserRepos } from './api'; 

describe('fetchUserRepos (GraphQL)', () => {
  const mockFetch = vi.fn();
  const oldEnv = process.env;

  beforeEach(() => {
    global.fetch = mockFetch;
    // Ensure the token exists for testing
    process.env = { ...oldEnv, VITE_GITHUB_TOKEN: 'test-token' };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env = oldEnv;
  });

  it('should call fetch with correct endpoint, method, headers, and body', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          user: {
            repositories: { nodes: [] }
          }
        }
      }),
    } as any);

    await fetchUserRepos('react');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/graphql',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer test-token`,
        }),
        body: expect.stringContaining('"login":"react"'),
      })
    );
  });

  it('should return mapped nodes when response is ok', async () => {
    const mockNodes = [
      {
        databaseId: 1,
        name: 'repo1',
        description: 'test repo',
        url: 'https://github.com/react/repo1',
        primaryLanguage: { name: 'TypeScript' },
        stargazerCount: 10,
        forkCount: 2,
        updatedAt: '2025-08-19T00:00:00Z',
        isArchived: false,
      }
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { user: { repositories: { nodes: mockNodes } } }
      }),
    } as any);

    const result = await fetchUserRepos('react');
    expect(result).toEqual(mockNodes);
  });

  it('should throw an error when response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: async () => ({ message: 'Forbidden' }),
    } as any);

    await expect(fetchUserRepos('react')).rejects.toThrow('Forbidden');
  });

  it('should throw an error when GraphQL returns errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        errors: [{ message: 'Something went wrong' }]
      }),
    } as any);

    await expect(fetchUserRepos('react')).rejects.toThrow('Something went wrong');
  });

  it('should throw an error when user not found', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { user: null }
      }),
    } as any);

    await expect(fetchUserRepos('nonexistent')).rejects.toThrow('User not found');
  });
});
