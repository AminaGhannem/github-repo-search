import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import RepoList from './components/RepoList'
import { fetchUserRepos } from './api'
import type { Repository, FetchState } from './types'

/**
 * Main application component for GitHub repository search and filtering.
 * 
 * Features:
 * - Search GitHub users by username
 * - Display repositories with filtering by name and language
 * - Handle loading states and errors
 * - Cancel in-flight requests when new search is initiated
 * 
 * @returns {JSX.Element} Rendered application interface
 * 
 * @example
 * ```tsx
 * import App from './App'
 * 
 * // Render the app
 * <App />
 * ```
 */
function App() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [status, setStatus] = useState<FetchState>('idle')
  const [error, setError] = useState<string>('')
  const [queriedUser, setQueriedUser] = useState<string>('')
  const [nameQuery, setNameQuery] = useState<string>('')
  const [language, setLanguage] = useState<string>('')
  const abortRef = useRef<AbortController | null>(null)

  /**
   * Handles the search for a GitHub user's repositories.
   * 
   * @param {string} username - The GitHub username to search for
   */
  async function handleSearch(username: string) {
    setQueriedUser(username)
    setNameQuery('')
    setLanguage('')
    setError('')
    setStatus('loading')

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const data = await fetchUserRepos(username, controller.signal)
      setRepos(data)
      setStatus('success')
    } catch (err) {
      setRepos([])
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  /**
   * Filtered repositories based on current name and language filters.
   */
  const filtered = useMemo(() => {
    const byName = nameQuery.trim().toLowerCase()
    return repos.filter(r => {
      const matchesName = byName ? r.name.toLowerCase().includes(byName) : true
      const matchesLang = language ? (r.language || '') === language : true
      return matchesName && matchesLang
    })
  }, [repos, nameQuery, language])

  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
      <h1 style={{ marginBottom: 12 }}>GitHub Repositories</h1>
      <p style={{ marginTop: 0, color: '#666' }}>Search a GitHub user to list public repositories. Filter by name and language.</p>

      <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        <SearchBar onSearch={handleSearch} isLoading={status === 'loading'} />

        {status === 'success' && (
          <Filters
            repos={repos}
            nameQuery={nameQuery}
            onNameQueryChange={setNameQuery}
            language={language}
            onLanguageChange={setLanguage}
          />
        )}

        {status === 'idle' && <p>Enter a username to see repositories.</p>}
        {status === 'loading' && <p>Loading…</p>}
        {status === 'error' && (
          <div role="alert" style={{ color: '#b00020' }}>{error}</div>
        )}

        {status === 'success' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>User: {queriedUser}</h2>
              <span style={{ color: '#666' }}>{filtered.length} of {repos.length} repositories</span>
            </div>
            <RepoList repos={filtered} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
