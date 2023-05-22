import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'src/redux/store'
import { MainPlayerControl, ThumnailSong, VolumeControl } from './partials'
import { useQuery } from 'react-query'
import { getNewMusic, geSongByName } from 'src/api/music.api'
import { SongInfor } from 'src/types/music.type'
import { isPlayChange, playListChange } from 'src/redux/slice/playerSlice'

export default function Player() {

  const { currentSong } = useSelector((state: RootState) => state.player)

  return (
    <>
      {
        currentSong &&
        <div className='h-[90px] z-[100] w-screen fixed bottom-0 right-0 left-0 shadow-2xl shadow-black bg-gray-100 dark:bg-slate-950 dark:shadow-blue-800'>
          <div className='w-full h-full grid grid-cols-3 content-center px-5 dark:text-white'>
            <ThumnailSong songInfor={currentSong} />
            <MainPlayerControl songInfor={currentSong} />
            <VolumeControl songInfor={currentSong} />
          </div>
        </div>
      }
    </>
  )
}
