import { AxiosResponse } from 'axios'
import { ListSong, SongInfor } from 'src/types/music.type'
import http from 'src/utils/http'

export const geSongByName = (name: string) => {
  return http.get<SongInfor>('/music/get-music-name', {
    params: {
      _name: name
    }
  })
}

export const getNewMusic = (limit: number, page: number) => {
  return http.get<ListSong>('/music/new-music', {
    params: {
      _limit: limit,
      _page: page
    }
  })
}

export const getTopFavourite = (limit: number, page: number) => {
  return http.get<ListSong>('/music/top-favorite', {
    params: {
      _limit: limit,
      _page: page
    }
  })
}

export const downLoadSong = (url: string, songName: string) => {
  return http
    .get(url, {
      responseType: 'blob'
    })
    .then((response) => {
      // Create a URL for the downloaded file
      const url = URL.createObjectURL(response.data)

      // Create a link to download the file
      const link = document.createElement('a')
      link.href = url
      link.download = songName

      // Append the link to the page and click it to trigger the download
      document.body.appendChild(link)
      link.click()

      // Clean up the URL and link
      URL.revokeObjectURL(url)
      document.body.removeChild(link)
    })
    .catch((error) => console.error(error))
}
