import type { Repository } from '../types';

type Props = {
  repos: Repository[];
};

export default function RepoList({ repos }: Props) {
  if (!repos.length) {
    return <p style={{ marginTop: 16 }}>No repositories found.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, marginTop: 12, display: 'grid', gap: 12 }}>
      {repos.map(repo => (
        <li key={repo.id} style={{ border: '1px solid #e2e2e2', borderRadius: 10, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
            <a href={repo.html_url} target="_blank" rel="noreferrer" style={{ fontSize: 18, fontWeight: 600 }}>
              {repo.name}
            </a>
            <div style={{ display: 'flex', gap: 12, color: '#666', fontSize: 14 }}>
              {repo.language && <span>{repo.language}</span>}
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
          </div>
          {repo.description && <p style={{ marginTop: 8 }}>{repo.description}</p>}
          <p style={{ marginTop: 8, color: '#888', fontSize: 12 }}>Updated {new Date(repo.updated_at).toLocaleString()}</p>
          {repo.archived && <span style={{ marginTop: 8, display: 'inline-block', background: '#fff4e5', color: '#a15c00', padding: '2px 8px', borderRadius: 6, fontSize: 12 }}>Archived</span>}
        </li>
      ))}
    </ul>
  );
} 