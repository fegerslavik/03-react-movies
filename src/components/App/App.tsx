import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { fetchMovies, fetchPopularMovies } from '../../services/movieService'
import type { Movie } from '../../types/movie'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loader from '../Loader/Loader'
import MovieGrid from '../MovieGrid/MovieGrid'
import MovieModal from '../MovieModal/MovieModal'
import SearchBar from '../SearchBar/SearchBar'
import styles from './App.module.css'

const DEFAULT_ERROR_MESSAGE =
  'Не вдалося завантажити дані. Спробуйте повторити запит трохи пізніше.'

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  function handleSelect(movie: Movie): void {
    setSelectedMovie(movie)
  }

  function handleCloseModal(): void {
    setSelectedMovie(null)
  }

  useEffect(() => {
    async function loadPopularMovies(): Promise<void> {
      setIsLoading(true)
      setError('')

      try {
        const moviesResponse = await fetchPopularMovies()
        setMovies(moviesResponse)
      } catch (searchError) {
        setMovies([])
        setError(
          searchError instanceof Error
            ? searchError.message
            : DEFAULT_ERROR_MESSAGE,
        )
      } finally {
        setIsLoading(false)
      }
    }

    void loadPopularMovies()
  }, [])

  async function handleSearch(nextQuery: string): Promise<void> {
    setIsLoading(true)
    setError('')
    setMovies([])
    setSelectedMovie(null)

    try {
      const moviesResponse = await fetchMovies(nextQuery)

      if (moviesResponse.length === 0) {
        toast.error('No movies found for your request.')
      }

      setMovies(moviesResponse)
    } catch (searchError) {
      setMovies([])
      setError(
        searchError instanceof Error
          ? searchError.message
          : DEFAULT_ERROR_MESSAGE,
      )
    } finally {
      setIsLoading(false)
    }
  }

  const shouldShowMovies = !isLoading && !error && movies.length > 0

  return (
    <main className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      <section className={styles.resultsSection}>
        {isLoading && <Loader />}

        {error && <ErrorMessage />}

        {shouldShowMovies && (
          <MovieGrid movies={movies} onSelect={handleSelect} />
        )}
      </section>

      {selectedMovie !== null && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </main>
  )
}
