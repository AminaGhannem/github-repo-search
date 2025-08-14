import type { Meta, StoryObj } from '@storybook/react';
import RepoList from './RepoList';
import type { Repository } from '../types';

const meta: Meta<typeof RepoList> = {
  title: 'Components/RepoList',
  component: RepoList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Sample repository data for testing.
 */
const sampleRepos: Repository[] = [
  {
    id: 1,
    name: 'react-app',
    description: 'A modern React application built with TypeScript and Vite. Features include component-based architecture, hooks, and responsive design.',
    html_url: 'https://github.com/user/react-app',
    language: 'JavaScript',
    stargazers_count: 150,
    forks_count: 25,
    updated_at: '2024-01-15T10:30:00Z',
    archived: false,
  },
  {
    id: 2,
    name: 'typescript-lib',
    description: 'TypeScript utility library with comprehensive type definitions and modern ES6+ features.',
    html_url: 'https://github.com/user/typescript-lib',
    language: 'TypeScript',
    stargazers_count: 89,
    forks_count: 12,
    updated_at: '2024-01-10T14:20:00Z',
    archived: false,
  },
  {
    id: 3,
    name: 'python-script',
    description: 'Python automation script for data processing and analysis.',
    html_url: 'https://github.com/user/python-script',
    language: 'Python',
    stargazers_count: 45,
    forks_count: 8,
    updated_at: '2024-01-08T09:15:00Z',
    archived: false,
  },
  {
    id: 4,
    name: 'legacy-project',
    description: 'Legacy project that has been archived.',
    html_url: 'https://github.com/user/legacy-project',
    language: 'JavaScript',
    stargazers_count: 12,
    forks_count: 3,
    updated_at: '2023-06-20T16:45:00Z',
    archived: true,
  },
  {
    id: 5,
    name: 'no-description',
    description: null,
    html_url: 'https://github.com/user/no-description',
    language: 'Rust',
    stargazers_count: 234,
    forks_count: 67,
    updated_at: '2024-01-12T11:00:00Z',
    archived: false,
  },
  {
    id: 6,
    name: 'no-language',
    description: 'Repository without detected programming language.',
    html_url: 'https://github.com/user/no-language',
    language: null,
    stargazers_count: 5,
    forks_count: 1,
    updated_at: '2024-01-05T08:30:00Z',
    archived: false,
  },
];

/**
 * Default state with multiple repositories.
 */
export const Default: Story = {
  args: {
    repos: sampleRepos,
  },
};

/**
 * Single repository.
 */
export const SingleRepo: Story = {
  args: {
    repos: [sampleRepos[0]],
  },
};

/**
 * Repository without description.
 */
export const NoDescription: Story = {
  args: {
    repos: [sampleRepos[4]],
  },
};

/**
 * Repository without language.
 */
export const NoLanguage: Story = {
  args: {
    repos: [sampleRepos[5]],
  },
};

/**
 * Archived repository.
 */
export const ArchivedRepo: Story = {
  args: {
    repos: [sampleRepos[3]],
  },
};

/**
 * Empty repository list.
 */
export const Empty: Story = {
  args: {
    repos: [],
  },
}; 