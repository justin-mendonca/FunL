import { type StreamingInfo } from '@/interfaces/streamingInfo'

interface BackdropURLs {
    [key: string]: string;
}

interface Genre {
    id: number
    name: string
}

interface PosterURLs {
    [key: string]: string;
  }

export interface Title {
    advisedMinimumAudienceAge: number
    backdropPath: string
    backdropURLs: BackdropURLs
    cast: string[]
    countries: string[]
    directors: string[]
    genres: Genre[]
    imdbId: string
    imdbRating: number
    imdbVoteCount: number
    originalLanguage: string
    originalTitle: string
    overview: string
    posterPath: string
    posterURLs: PosterURLs
    runtime: number
    streamingInfo: StreamingInfo
    tagline: string 
    title: string 
    tmdbId: number 
    tmdbRating: number
    type: string
    year: number
    youtubeTrailerVideoId: string 
    youtubeTrailerVideoLink: string 
}