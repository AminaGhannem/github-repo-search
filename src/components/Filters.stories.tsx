import type { Meta, StoryObj } from '@storybook/react';
import Filters from './Filters';
import type { Repository } from '../types';

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
const sampleRepos: Repository[] = [
  {
    id: 1,
    name: 'react-app',
    description: 'A React application',
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
    description: 'TypeScript library',
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
    description: 'Python automation script',
    html_url: 'https://github.com/user/python-script',
    language: 'Python',
    stargazers_count: 45,
    forks_count: 8,
    updated_at: '2024-01-08T09:15:00Z',
    archived: false,
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