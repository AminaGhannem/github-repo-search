import { useMemo } from 'react';
import type { Repository } from '../types';

type Props = {
  repos: Repository[];
  nameQuery: string;
  onNameQueryChange: (v: string) => void;
  language: string;
  onLanguageChange: (v: string) => void;
};

export default function Filters({ repos, nameQuery, onNameQueryChange, language, onLanguageChange }: Props) {
  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach(r => {
      if (r.language) set.add(r.language);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [repos]);

  return (
    <div style={{ display: 'flex', gap: 8, width: '100%' }}>
      <input
        type="text"
        placeholder="Filter by repository name..."
        value={nameQuery}
        onChange={(e) => onNameQueryChange(e.target.value)}
        style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: '1px solid #ccc' }}
      />
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        style={{ minWidth: 160, padding: '8px 10px', borderRadius: 8, border: '1px solid #ccc' }}
      >
        <option value="">All languages</option>
        {languages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
    </div>
  );
} 