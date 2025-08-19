import type { GraphQlRepo } from '../types';

/**
 * Props for the RepoList component.
 */
type Props = {
  /** Array of repositories to display */
  repos: GraphQlRepo[];
};

/**
 * A component that renders a list of GitHub repositories.
 * 
 * Features:
 * - Displays repository name, description, language, stars, and forks
 * - Shows last update timestamp
 * - Indicates archived repositories
 * - Responsive grid layout
 * - Empty state when no repositories are provided
 * 
 * @param {Props} props - Component props
 * @returns {JSX.Element} Rendered repository list or empty state message
 * 
 * @example
 * ```tsx
 * <RepoList repos={userRepositories} />
 * ```
 */
export default function RepoList({ repos }: Props) {
  if (!repos.length) {
    return <p style={{ marginTop: 16 }}>No repositories found.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, marginTop: 12, display: 'grid', gap: 12 }}>
      {repos.map(repo => (
        <li key={repo.databaseId} style={{ border: '1px solid #e2e2e2', borderRadius: 10, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
            <a href={repo.url} target="_blank" rel="noreferrer" style={{ fontSize: 18, fontWeight: 600 }}>
              {repo.name}
            </a>
            <div style={{ display: 'flex', gap: 12, color: '#666', fontSize: 14 }}>
              {repo.primaryLanguage?.name && <span>{repo.primaryLanguage.name}</span>}
              <span>⭐ {repo.stargazerCount}</span>
              <span>🍴 {repo.forkCount}</span>
            </div>
          </div>
          {repo.description && <p style={{ marginTop: 8 }}>{repo.description}</p>}
          <p style={{ marginTop: 8, color: '#888', fontSize: 12 }}>Updated {new Date(repo.updatedAt).toLocaleString()}</p>
          {repo.isArchived && <span style={{ marginTop: 8, display: 'inline-block', background: '#fff4e5', color: '#a15c00', padding: '2px 8px', borderRadius: 6, fontSize: 12 }}>Archived</span>}
        </li>
      ))}
    </ul>
  );
} 