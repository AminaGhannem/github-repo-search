export type Repository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  archived: boolean;
};

export type FetchState = 'idle' | 'loading' | 'success' | 'error'; 