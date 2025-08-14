import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSearch: { action: 'searched' },
    isLoading: { control: 'boolean' },
    initialUsername: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state of the search bar.
 */
export const Default: Story = {
  args: {},
};

/**
 * Search bar with a pre-filled username.
 */
export const WithInitialValue: Story = {
  args: {
    initialUsername: 'octocat',
  },
};

/**
 * Search bar in loading state.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

/**
 * Search bar with a long username to test responsive behavior.
 */
export const LongUsername: Story = {
  args: {
    initialUsername: 'very-long-github-username-example',
  },
}; 