import type { Meta, StoryObj } from '@storybook/react';
import RepoList from './RepoList';
import type { GraphQlRepo } from '../types';

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
const sampleRepos: GraphQlRepo[] = [
  {
    databaseId: 1,
    name: 'react-app',
    description: 'A modern React application built with TypeScript and Vite. Features include component-based architecture, hooks, and responsive design.',
    url: 'https://github.com/user/react-app',
    primaryLanguage: { name: 'JavaScript' },
    stargazerCount: 150,
    forkCount: 25,
    updatedAt: '2024-01-15T10:30:00Z',
    isArchived: false,
  },
  {
    databaseId: 2,
    name: 'typescript-lib',
    description: 'TypeScript utility library with comprehensive type definitions and modern ES6+ features.',
    url: 'https://github.com/user/typescript-lib',
    primaryLanguage: { name: 'TypeScript' },
    stargazerCount: 89,
    forkCount: 12,
    updatedAt: '2024-01-10T14:20:00Z',
    isArchived: false,
  },
  {
    databaseId: 3,
    name: 'python-script',
    description: 'Python automation script for data processing and analysis.',
    url: 'https://github.com/user/python-script',
    primaryLanguage: { name: 'Python' },
    stargazerCount: 45,
    forkCount: 8,
    updatedAt: '2024-01-08T09:15:00Z',
    isArchived: false,
  },
  {
    databaseId: 4,
    name: 'legacy-project',
    description: 'Legacy project that has been archived.',
    url: 'https://github.com/user/legacy-project',
    primaryLanguage: { name: 'JavaScript' },
    stargazerCount: 12,
    forkCount: 3,
    updatedAt: '2023-06-20T16:45:00Z',
    isArchived: true,
  },
  {
    databaseId: 5,
    name: 'no-description',
    description: null,
    url: 'https://github.com/user/no-description',
    primaryLanguage: { name: 'Rust' },
    stargazerCount: 234,
    forkCount: 67,
    updatedAt: '2024-01-12T11:00:00Z',
    isArchived: false,
  },
  {
    databaseId: 6,
    name: 'no-language',
    description: 'Repository without detected programming language.',
    url: 'https://github.com/user/no-language',
    primaryLanguage: null,
    stargazerCount: 5,
    forkCount: 1,
    updatedAt: '2024-01-05T08:30:00Z',
    isArchived: false,
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