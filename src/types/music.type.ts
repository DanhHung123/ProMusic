interface AccountFavorite {
  image: string
  role: number
  createdAt: string
  _id: string
  user_name: string
  id_music: string
}

export interface SongInfor {
  message: string
  data: {
    link_mv: string
    sum_comment: any
    view: number
    favorite: number
    account_favorite: AccountFavorite[] | null
    createdAt: string
    updatedAt: string
    _id: string
    id_account: string
    name_singer: string
    slug_name_singer: string
    src_music: string
    image_music: string
    time_format: string
    seconds: number
    name_music: string
    slug_name_music: string
    category: string
    slug_category: string
    subscribe: string
    slug_subscribe: string
  }
}

export interface ListSong {
  pagination: {
    _limit: number
    _page: number
    _total: number
  }
  data: SongInfor[]
}
