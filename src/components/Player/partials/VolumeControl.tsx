import React, { useState } from 'react'
import { RootState } from 'src/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { isMutedChange, isVolumeChange } from 'src/redux/slice/playerSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh, faListUl, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'
import Mv from './Mv'
import Playlist from './Playlist'
import { SongInfor } from 'src/types/music.type'

interface Props {
  songInfor: SongInfor | null
}

export default function VolumeControl({ songInfor }: Props) {
  const [isMvShow, setIsMvShow] = useState<boolean>(false)
  const [isPlaylistShow, setIsPlaylistShow] = useState<boolean>(false)

  const { isMuted, volume } = useSelector((state: RootState) => state.player)
  const dispatch = useDispatch()

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(isVolumeChange(Number(e.target.value)))
    if (Number(e.target.value) === 0) {
      dispatch(isMutedChange(true))
    } else {
      dispatch(isMutedChange(false))
    }
  }

  const handleToogleVolume = () => {
    dispatch(isMutedChange(!isMuted))

    isMuted ? dispatch(isVolumeChange(1)) : dispatch(isVolumeChange(0))
  }

  const handleShowMv = () => {
    setIsMvShow(!isMvShow)
  }

  const handlePlaylistShow = () => {
    setIsPlaylistShow(!isPlaylistShow)
  }

  return (
    <div className='flex items-center justify-end gap-3'>
      <div>
        <button className='uppercase rounded-full h-9 w-9 flex items-center justify-center text-[10px] font-semibold hover:bg-gray-200 dark:hover:bg-gray-300/40'
          type='button'
          onClick={handleShowMv}
        >
          <span className='px-[2px] py-[1px] rounded-lg border-2 border-black dark:border-white'>MV</span>
        </button>
        {isMvShow && <Mv idMv={songInfor?.link_mv || ''} handleShowMv={handleShowMv} />}
      </div>
      <div className='max-w-[150px] flex items-center gap-2'>
        <div>
          <button className={`peer rounded-full h-9 w-9 flex items-center justify-center text-lg hover:bg-gray-200 dark:hover:bg-gray-300/40`}
            type='button'
            onClick={handleToogleVolume}
          >
            <FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
          </button>
        </div>
        <input className='input_range h-[5px]' style={{ backgroundSize: `${volume * 100}%  100%` }} step='0.1' type="range" min='0' max='1'
          onChange={handleVolumeChange} value={volume} />
      </div>
      <div className='w-[1.5px] h-[50%] bg-gray-400 mx-2'></div>
      <div>
        <button className='rounded-lg h-9 w-9 flex items-center justify-center text-lg bg-gray-300/50 hover:opacity-80' type='button' onClick={handlePlaylistShow}><FontAwesomeIcon icon={faListUl} /></button>
        {
          isPlaylistShow && <Playlist />
        }
      </div>
    </div>
  )
}
