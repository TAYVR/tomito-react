// TMDB API Configuration
export const TMDB_CONFIG = {
  API_KEY: "882e741f7283dc9ba1654d4692ec30f6",
  BASE_URL: "https://api.themoviedb.org/3",
  IMG_URL: "https://image.tmdb.org/t/p",
  SEARCH_LANGUAGE: "ar",
  DISPLAY_LANGUAGE: "ar",
};

export const getImageUrl = (path: string | null, size: "w500" | "w780" | "w1280" | "original" = "w500") => {
  if (!path) return "/placeholder.svg";
  return `${TMDB_CONFIG.IMG_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null) => {
  if (!path) return null;
  return `${TMDB_CONFIG.IMG_URL}/original${path}`;
};

// Types
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  popularity: number;
}

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date: string;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  still_path: string | null;
  episode_number: number;
  season_number: number;
  air_date: string;
  vote_average: number;
  runtime: number;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  tagline: string;
  budget: number;
  revenue: number;
  imdb_id: string;
}

export interface TVShowDetails extends TVShow {
  genres: Genre[];
  seasons: Season[];
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
  status: string;
}

// API Functions
export async function fetchTrending(mediaType: "movie" | "tv" = "movie", timeWindow: "day" | "week" = "week") {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${TMDB_CONFIG.API_KEY}&language=${TMDB_CONFIG.DISPLAY_LANGUAGE}`
  );
  const data = await response.json();
  return data.results as (Movie | TVShow)[];
}

export async function fetchPopular(mediaType: "movie" | "tv" = "movie", page = 1) {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/${mediaType}/popular?api_key=${TMDB_CONFIG.API_KEY}&language=${TMDB_CONFIG.DISPLAY_LANGUAGE}&page=${page}`
  );
  const data = await response.json();
  return { results: data.results as (Movie | TVShow)[], total_pages: data.total_pages, page: data.page };
}

export async function fetchTopRated(mediaType: "movie" | "tv" = "movie", page = 1) {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/${mediaType}/top_rated?api_key=${TMDB_CONFIG.API_KEY}&language=${TMDB_CONFIG.DISPLAY_LANGUAGE}&page=${page}`
  );
  const data = await response.json();
  return { results: data.results as (Movie | TVShow)[], total_pages: data.total_pages };
}

export async function fetchByGenre(mediaType: "movie" | "tv", genreId: number, page = 1) {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/discover/${mediaType}?api_key=${TMDB_CONFIG.API_KEY}&language=${TMDB_CONFIG.DISPLAY_LANGUAGE}&with_genres=${genreId}&page=${page}`
  );
  const data = await response.json();
  return { results: data.results as (Movie | TVShow)[], total_pages: data.total_pages };
}

export async function fetchGenres(mediaType: "movie" | "tv" = "movie") {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/genre/${mediaType}/list?api_key=${TMDB_CONFIG.API_KEY}&language=${TMDB_CONFIG.DISPLAY_LANGUAGE}`
  );
  const data = await response.json();
  return data.genres as Genre[];
}

export async function fetchMovieDetails(id: number) {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/movie/${id}?api_key=${TMDB_CONFIG.API_KEY}&language=${TMDB_CONFIG.DISPLAY_LANGUAGE}`
  );
  return response.json() as Promise<MovieDetails>;
}

export async function fetchTVDetails(id: number) {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/tv/${id}?api_key=${TMDB_CONFIG.API_KEY}&language=${TMDB_CONFIG.DISPLAY_LANGUAGE}`
  );
  return response.json() as Promise<TVShowDetails>;
}

export async function fetchCredits(mediaType: "movie" | "tv", id: number) {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/${mediaType}/${id}/credits?api_key=${TMDB_CONFIG.API_KEY}&language=${TMDB_CONFIG.DISPLAY_LANGUAGE}`
  );
  const data = await response.json();
  return data.cast as Cast[];
}

export async function fetchSeasonDetails(tvId: number, seasonNumber: number) {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${TMDB_CONFIG.API_KEY}&language=${TMDB_CONFIG.DISPLAY_LANGUAGE}`
  );
  const data = await response.json();
  return {
    episodes: data.episodes as Episode[],
    name: data.name,
    overview: data.overview,
    poster_path: data.poster_path,
  };
}

export async function searchMulti(query: string, page = 1) {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/search/multi?api_key=${TMDB_CONFIG.API_KEY}&language=${TMDB_CONFIG.DISPLAY_LANGUAGE}&query=${encodeURIComponent(query)}&page=${page}`
  );
  const data = await response.json();
  return { results: data.results, total_pages: data.total_pages, total_results: data.total_results };
}

export async function fetchPersonDetails(id: number) {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/person/${id}?api_key=${TMDB_CONFIG.API_KEY}&language=${TMDB_CONFIG.DISPLAY_LANGUAGE}`
  );
  return response.json();
}

export async function fetchPersonCredits(id: number) {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/person/${id}/combined_credits?api_key=${TMDB_CONFIG.API_KEY}&language=${TMDB_CONFIG.DISPLAY_LANGUAGE}`
  );
  const data = await response.json();
  return data.cast;
}

export async function fetchSimilar(mediaType: "movie" | "tv", id: number) {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/${mediaType}/${id}/similar?api_key=${TMDB_CONFIG.API_KEY}&language=${TMDB_CONFIG.DISPLAY_LANGUAGE}`
  );
  const data = await response.json();
  return data.results as (Movie | TVShow)[];
}

// Video servers configuration
export const VIDEO_SERVERS = [
  {
    id: "server_1",
    name: "السيرفر الرئيسي",
    movieUrl: "https://vidsrc-embed.ru/embed/movie/",
    tvUrl: "https://vidsrc-embed.ru/embed/tv/",
    quality: "FHD",
    icon: "rocket",
  },
  {
    id: "server_2",
    name: "سيرفر VIP",
    movieUrl: "https://multiembed.mov/directstream.php?video_id=",
    tvUrl: "https://multiembed.mov/directstream.php?video_id=",
    quality: "HD",
    icon: "crown",
  },
  {
    id: "server_3",
    name: "سيرفر 3",
    movieUrl: "https://www.2embed.cc/embed/",
    tvUrl: "https://www.2embed.cc/embedtv/",
    quality: "HD",
    icon: "film",
  },
];

export function getVideoUrl(server: typeof VIDEO_SERVERS[0], id: number, type: "movie" | "tv", season?: number, episode?: number) {
  if (type === "movie") {
    return `${server.movieUrl}${id}`;
  }
  return `${server.tvUrl}${id}/${season}/${episode}`;
}
