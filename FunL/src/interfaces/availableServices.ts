interface ServiceInfo {
  addOn: string
  audios: any
  availableSince: number
  leaving: number
  link: string
  price: any
  quality: string
  subtitles: any
  type: string
  watchLink: string
}

export interface AvailableServices {
  [serviceName: string]: ServiceInfo
}
