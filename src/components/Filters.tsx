import { useMemo } from 'react';
import type { Repository } from '../types';

/**
 * Props for the Filters component.
 */
type Props = {
  /** Array of repositories to extract languages from */
  repos: Repository[];
  /** Current name filter query */
  nameQuery: string;
  /** Callback when name filter changes */
  onNameQueryChange: (v: string) => void;
  /** Currently selected language filter */
  language: string;
  /** Callback when language filter changes */
  onLanguageChange: (v: string) => void;
};

/**
 * A filtering component for repositories by name and programming language.
 * 
 * Features:
 * - Text input for filtering by repository name
 * - Dropdown for filtering by programming language
 * - Automatically extracts unique languages from repositories
 * - Responsive layout with proper spacing
 * 
 * @param {Props} props - Component props
 * @returns {JSX.Element} Rendered filter controls
 * 
 * @example
 * ```tsx
 * <Filters
 *   repos={repositories}
 *   nameQuery={nameFilter}
 *   onNameQueryChange={setNameFilter}
 *   language={selectedLanguage}
 *   onLanguageChange={setSelectedLanguage}
 * />
 * ```
 */
export default function Filters({ repos, nameQuery, onNameQueryChange, language, onLanguageChange }: Props) {
  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach(r => {
      if (r.language) set.add(r.language);
    });
    return Array.from(set);
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