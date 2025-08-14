/**
 * Represents a GitHub repository with essential metadata.
 */
export type Repository = {
  /** Unique identifier for the repository */
  id: number;
  /** Repository name */
  name: string;
  /** Repository description, if provided */
  description: string | null;
  /** URL to the repository on GitHub */
  html_url: string;
  /** Primary programming language, if detected */
  language: string | null;
  /** Number of stars the repository has received */
  stargazers_count: number;
  /** Number of forks of the repository */
  forks_count: number;
  /** Last update timestamp in ISO format */
  updated_at: string;
  /** Whether the repository is archived */
  archived: boolean;
};

/**
 * Represents the current state of an API fetch operation.
 */
export type FetchState = 'idle' | 'loading' | 'success' | 'error'; 