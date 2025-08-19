import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchUserRepos } from './api'; // adjust path if needed

describe('fetchUserRepos', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call fetch with the correct URL and headers', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, name: 'repo1' }],
    } as any);

    await fetchUserRepos('react');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/users/react/repos?per_page=100&sort=updated',
      { headers: { Accept: 'application/vnd.github+json' }, signal: undefined }
    );
  });

  it('should return JSON data when response is ok', async () => {
    const data = [{ id: 1, name: 'repo1' }];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data,
    } as any);

    const result = await fetchUserRepos('react');
    expect(result).toEqual(data);
  });

  it('should throw an error when response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as any);

    await expect(fetchUserRepos('react')).rejects.toThrow(
      'Request failed with status 404'
    );
  });
});
