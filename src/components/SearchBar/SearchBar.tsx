import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { toast } from 'react-hot-toast'

import styles from './SearchBar.module.css'

interface SearchBarProps {
  onSubmit: (query: string) => Promise<void> | void
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [query, setQuery] = useState('')

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.target.value)
  }

  async function handleFormAction(formData: FormData): Promise<void> {
    const formValue = formData.get('query')
    const queryValue = typeof formValue === 'string' ? formValue : ''
    const normalizedQuery = queryValue.trim()

    if (!normalizedQuery) {
      toast.error('Please enter your search query.')
      return
    }

    setQuery(queryValue)
    await onSubmit(normalizedQuery)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={styles.form} action={handleFormAction}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            value={query}
            onChange={handleChange}
          />

          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  )
}
