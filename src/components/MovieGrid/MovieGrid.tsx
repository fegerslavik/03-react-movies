import type { Movie } from '../../types/movie'
import MovieCard from '../MovieCard/MovieCard'
import styles from './MovieGrid.module.css'

interface MovieGridProps {
  onSelect: (movie: Movie) => void
  movies: Movie[]
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <button
            className={styles.cardButton}
            type="button"
            onClick={() => onSelect(movie)}
          >
            <MovieCard movie={movie} />
          </button>
        </li>
      ))}
    </ul>
  )
}
