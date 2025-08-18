import { useEffect, useRef, useState } from 'react';

/**
 * Props for the SearchBar component.
 */
type Props = {
  /** Callback function called when a search is submitted */
  onSearch: (username: string) => void;
  /** Initial username value to populate the input */
  initialUsername?: string;
  /** Whether the search is currently in progress */
  isLoading?: boolean;
};

/**
 * A search input component for entering GitHub usernames.
 * 
 * Features:
 * - Auto-focuses on mount for better UX
 * - Prevents submission of empty usernames
 * - Shows loading state during search
 * - Accessible with proper labels and ARIA attributes
 * 
 * @param {Props} props - Component props
 * @returns {JSX.Element} Rendered search form
 * 
 * @example
 * ```tsx
 * <SearchBar 
 *   onSearch={(username) => handleSearch(username)}
 *   isLoading={isSearching}
 * />
 * ```
 */
export default function SearchBar({ onSearch, initialUsername = '', isLoading = false }: Props) {
  const [username, setUsername] = useState(initialUsername);
  // const inputRef = useRef<HTMLInputElement | null>(null);

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, []);

  /**
   * Handles form submission and triggers the search callback.
   * 
   * @param {React.FormEvent} e - Form submission event
   */
  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(username.trim());
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, width: '100%' }} aria-label="Search GitHub user">
      <label htmlFor="username" className="visually-hidden">GitHub username</label>
      <input
        // ref={inputRef}
        id="username"
        type="text"
        placeholder="Search by GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc' }}
        autoComplete="off"
      />
      <button type="submit" disabled={!username.trim() || isLoading} style={{ padding: '10px 14px' }}>
        {isLoading ? 'Searching…' : 'Search'}
      </button>
    </form>
  );
} 