import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { MouseEvent } from 'react'

import type { Movie } from '../../types/movie'
import styles from './MovieModal.module.css'

interface MovieModalProps {
  movie: Movie
  onClose: () => void
}

function getBackdropUrl(backdropPath: string): string {
  return `https://image.tmdb.org/t/p/original${backdropPath}`
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    function handleEscape(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>): void {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const imagePath = movie.backdrop_path || movie.poster_path

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <img
          className={styles.image}
          src={getBackdropUrl(imagePath)}
          alt={movie.title}
        />

        <div className={styles.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
