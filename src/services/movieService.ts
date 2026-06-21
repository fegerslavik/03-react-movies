import axios from 'axios'

import type { Movie } from '../types/movie'

const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'

interface FetchMoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

async function fetchMovieCollection(
  endpoint: string,
  query?: string,
): Promise<Movie[]> {
  const response = await movieApi.get<FetchMoviesResponse>(endpoint, {
    params: {
      include_adult: false,
      language: 'uk-UA',
      page: 1,
      ...(query ? { query } : {}),
    },
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  })

  return response.data.results
}

function getAuthorizationHeader(): string {
  const token = import.meta.env.VITE_TMDB_TOKEN?.trim()

  if (!token) {
    throw new Error(
      'Не знайдено VITE_TMDB_TOKEN. Додайте токен TMDB у файл .env.',
    )
  }

  return `Bearer ${token}`
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  return fetchMovieCollection('/search/movie', query)
}

export async function fetchPopularMovies(): Promise<Movie[]> {
  return fetchMovieCollection('/movie/popular')
}

export function getPosterUrl(posterPath: string): string {
  return `${POSTER_BASE_URL}${posterPath}`
}
