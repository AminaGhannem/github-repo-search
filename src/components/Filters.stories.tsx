import type { Meta, StoryObj } from '@storybook/react';
import Filters from './Filters';
import type { GraphQlRepo } from '../types';

const meta: Meta<typeof Filters> = {
  title: 'Components/Filters',
  component: Filters,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onNameQueryChange: { action: 'nameQueryChanged' },
    onLanguageChange: { action: 'languageChanged' },
  },
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
    description: 'A React application',
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
    description: 'TypeScript library',
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
    description: 'Python automation script',
    url: 'https://github.com/user/python-script',
    primaryLanguage: { name: 'Python' },
    stargazerCount: 45,
    forkCount: 8,
    updatedAt: '2024-01-08T09:15:00Z',
    isArchived: false,
  },
];

/**
 * Default state with sample repositories.
 */
export const Default: Story = {
  args: {
    repos: sampleRepos,
    nameQuery: '',
    language: '',
  },
};

/**
 * With name filter applied.
 */
export const WithNameFilter: Story = {
  args: {
    repos: sampleRepos,
    nameQuery: 'react',
    language: '',
  },
};

/**
 * With language filter applied.
 */
export const WithLanguageFilter: Story = {
  args: {
    repos: sampleRepos,
    nameQuery: '',
    language: 'TypeScript',
  },
};

/**
 * With both filters applied.
 */
export const WithBothFilters: Story = {
  args: {
    repos: sampleRepos,
    nameQuery: 'script',
    language: 'Python',
  },
};

/**
 * Empty repository list.
 */
export const EmptyRepos: Story = {
  args: {
    repos: [],
    nameQuery: '',
    language: '',
  },
}; 