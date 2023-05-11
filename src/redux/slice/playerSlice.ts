import { PayloadAction, createAsyncThunk, createSlice, isAction } from '@reduxjs/toolkit'
import http from 'src/utils/http'
import axios from 'axios'
import { SongInfor } from 'src/types/music.type'

interface InitState {
  isPlay: boolean
  isRepeat: boolean
  isMuted: boolean
  currentSongName: string
  volume: number
  playList: any
  songInfor: SongInfor | null
}

const initialState: InitState = {
  isPlay: false,
  isRepeat: false,
  isMuted: false,
  currentSongName: 'faded',
  volume: 1,
  playList: null,
  songInfor: null
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
    currentSongNameChange: (state, action: PayloadAction<string>) => {
      state.currentSongName = action.payload
    },
    isVolumeChange: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
    },
    playListChange: (state, action) => {
      state.playList = action.payload
    },
    songInforChange: (state, action: PayloadAction<SongInfor>) => {
      state.songInfor = action.payload
    }
  }
})

export const {
  isPlayChange,
  isRepeatChange,
  isMutedChange,
  currentSongNameChange,
  isVolumeChange,
  playListChange,
  songInforChange
} = playerSlice.actions

const playerReducer = playerSlice.reducer
export default playerReducer
