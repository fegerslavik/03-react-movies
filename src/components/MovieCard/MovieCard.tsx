import { getPosterUrl } from '../../services/movieService'
import type { Movie } from '../../types/movie'
import styles from './MovieCard.module.css'

interface MovieCardProps {
  movie: Movie
}

function getReleaseYear(releaseDate: string): string {
  return releaseDate ? releaseDate.slice(0, 4) : 'Невідомо'
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterPath = movie.poster_path
  const hasPoster = Boolean(posterPath)

  return (
    <article className={styles.card}>
      {hasPoster ? (
        <img
          className={styles.poster}
          src={getPosterUrl(posterPath)}
          alt={movie.title}
          loading="lazy"
        />
      ) : (
        <div className={styles.posterFallback}>
          <span>No poster</span>
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.badge}>
            {getReleaseYear(movie.release_date)}
          </span>
          <span className={styles.badge}>
            IMDb {movie.vote_average.toFixed(1)}
          </span>
        </div>

        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.overview}>
          {movie.overview || 'Опис для цього фільму тимчасово відсутній.'}
        </p>
      </div>
    </article>
  )
}
