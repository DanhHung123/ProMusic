import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import BtnControl from './BtnControl'
import { SongInfor } from 'src/types/music.type'
import { faDownload, faHeart, faEllipsis, faClapperboard, faBarsStaggered } from '@fortawesome/free-solid-svg-icons'
import { downLoadSong } from 'src/api/music.api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Mv from './Mv'

interface Props {
  songInfor: SongInfor | null
}

function ThumnailSong({ songInfor }: Props) {
  const [popoverShow, setPopoverShow] = useState<boolean>(false)
  const [isMvShow, setIsMvShow] = useState<boolean>(false)

  const popoverRef = useRef<HTMLDivElement>(null)
  const popoverBtnRef = useRef<HTMLButtonElement>(null)
  const iconRef = useRef<any>(null)

  useEffect(() => {
    const handleHiddenPopover = (event: any) => {
      if (popoverRef?.current) {
        if (!popoverRef.current.contains(event.target) && event.target !== popoverBtnRef.current && event.target !== iconRef.current) {
          setPopoverShow(false);
        }
      }
    }
    document.addEventListener('click', handleHiddenPopover);

    return () => {
      document.removeEventListener('click', handleHiddenPopover)
    }
  }, [])

  const handleDownLoadSong = useCallback(() => {
    if (songInfor) {
      downLoadSong(songInfor?.src_music, songInfor?.name_music)
    }
  }, [songInfor])

  const handleShowMv = () => {
    setIsMvShow(!isMvShow)
  }

  return (
    <div className='flex items-center gap-3'>
      <img className='h-16 w-16 rounded-lg object-cover'
        alt='Song Player'
        src={songInfor?.image_music}
        title={songInfor?.name_music} />
      <div className='text-medium'>
        <h4 className='text-base'>{songInfor?.name_music}</h4>
        <span className='text-xs opacity-80 dark:text-gray-300'>{songInfor?.name_singer}</span>
      </div>
      <div className='flex gap-3 ml-3 relative'>
        <BtnControl icon={faHeart} addClass='text-lg hover:text-sky-500' title='Add favourite' />
        <button ref={popoverBtnRef} className='rounded-full h-9 w-9 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-300/40 text-xl'
          type='button'
          onClick={() => setPopoverShow(!popoverShow)}
        >
          <FontAwesomeIcon icon={faEllipsis} ref={iconRef} />
        </button>
        <div ref={popoverRef} className={`absolute -top-40 right-0 z-50 w-[220px] bg-gray-200 shadow-md rounded-md dark:bg-slate-800 ${popoverShow ? 'visible' : 'invisible'} `}>
          <ul className='py-2'>
            <li className='flex items-center w-full pl-5 py-2 cursor-pointer hover:bg-gray-300'
              onClick={handleDownLoadSong}>
              <i className='mr-3'><FontAwesomeIcon icon={faDownload} /></i>
              Download
            </li>
            <li className='flex items-center w-full pl-5 py-2 cursor-pointer hover:bg-gray-300'
              onClick={handleShowMv}>
              <i className='mr-3'><FontAwesomeIcon icon={faClapperboard} /></i>
              View MV
              {isMvShow && <Mv idMv={songInfor?.link_mv || ''} handleShowMv={handleShowMv} />}
            </li>
            <li className='flex items-center w-full pl-5 py-2 cursor-pointer hover:bg-gray-300'>
              <i className='mr-3'><FontAwesomeIcon icon={faBarsStaggered} /></i>
              Add playlist
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default memo(ThumnailSong)
