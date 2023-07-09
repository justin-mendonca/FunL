interface BackdropURLs {
    [key: string]: string;
}

interface Cast {
    $id: string
    $values: string[]
}

interface Countries {
    $id: string
    $values: string[]
}

interface Directors {
    $id: string
    $values: string[]
}

interface Genres {
    $id: string
    $values: string[]
}

interface PosterURLs {
    [key: string]: string;
  }

interface StreamingServices {
    $id: string
    $values: StreamingServiceInfo[]
}

interface StreamingServiceInfo {
    $id: string
    addOn: string
    audios: string
    availableSince: number
    country: string
    leaving: number
    link: string
    platform: string
    price: any
    quality: string
    subtitles: string
    type: string
    watchLink: string
}

export interface FetchedTitle {
    $id: string
    advisedMinimumAudienceAge: number
    backdropPath: string
    backdropURLs: BackdropURLs
    cast: Cast
    countries: Countries
    directors: Directors
    genres: Genres
    imdbId: string
    imdbRating: number
    imdbVoteCount: number
    name: string
    originalLanguage: string
    originalTitle: string
    overview: string
    posterPath: string
    posterURLs: PosterURLs
    runtime: number
    streamingServices: StreamingServices
    tagline: string 
    tmdbId: number 
    tmdbRating: number
    type: string
    year: number
    youtubeTrailerVideoId: string 
    youtubeTrailerVideoLink: string
}