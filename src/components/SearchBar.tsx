import { useEffect, useRef, useState } from 'react';

type Props = {
  onSearch: (username: string) => void;
  initialUsername?: string;
  isLoading?: boolean;
};

export default function SearchBar({ onSearch, initialUsername = '', isLoading = false }: Props) {
  const [username, setUsername] = useState(initialUsername);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(username.trim());
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, width: '100%' }} aria-label="Search GitHub user">
      <label htmlFor="username" className="visually-hidden">GitHub username</label>
      <input
        ref={inputRef}
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