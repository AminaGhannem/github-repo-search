/**
 * Represents a GitHub repository with essential metadata.
 */
export type GraphQlRepo = {
  /** Unique identifier for the repository */
    databaseId: number | null;
  /** Repository name */
  name: string;
  /** Repository description, if provided */
  description: string | null;
  /** URL to the repository on GitHub */
  url: string;
  /** Primary programming language, if detected */
    primaryLanguage: { name: string } | null;
  /** Number of stars the repository has received */
  stargazerCount: number;
  /** Number of forks of the repository */
  forkCount: number;
  /** Last update timestamp in ISO format */
  updatedAt: string;
  /** Whether the repository is archived */
  isArchived: boolean;
};

/**
 * Represents the current state of an API fetch operation.
 */
export type FetchState = 'idle' | 'loading' | 'success' | 'error'; 

// export type GraphQlRepo = {
//     databaseId: number | null;
//     name: string;
//     description: string | null;
//     url: string;
//     primaryLanguage: { name: string } | null;
//     stargazerCount: number;
//     forkCount: number;
//     updatedAt: string;
//     isArchived: boolean;
//   };