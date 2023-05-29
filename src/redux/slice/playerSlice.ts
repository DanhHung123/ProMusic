import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SongInfor } from 'src/types/music.type'

interface InitState {
  isPlay: boolean
  isRepeat: boolean
  isMuted: boolean
  volume: number
  playList: any
  currentSong: SongInfor | null
  playlistHistory: SongInfor[]
}

const initialState: InitState = {
  isPlay: false,
  isRepeat: false,
  isMuted: false,
  volume: 1,
  playList: null,
  currentSong: null,
  playlistHistory: []
}

export const playerSlice = createSlice({
  name: 'player',
  initialState: initialState,
  reducers: {
    isPlayChange: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload
    },
    isRepeatChange: (state, action: PayloadAction<boolean>) => {
      state.isRepeat = action.payload
    },
    isMutedChange: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload
    },
    isVolumeChange: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
    },
    playListChange: (state, action) => {
      state.playList = action.payload
    },
    currentSongChange: (state, action: PayloadAction<SongInfor | null>) => {
      state.currentSong = action.payload
    },
    playlistHistoryChange: (state, action: PayloadAction<SongInfor[]>) => {
      state.playlistHistory = action.payload
    }
  }
})

export const {
  isPlayChange,
  isRepeatChange,
  isMutedChange,
  isVolumeChange,
  playListChange,
  currentSongChange,
  playlistHistoryChange
} = playerSlice.actions

const playerReducer = playerSlice.reducer
export default playerReducer
