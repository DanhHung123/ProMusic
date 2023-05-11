import React, { memo, useCallback } from 'react'
import BtnControl from './BtnControl'
import { SongInfor } from 'src/types/music.type'
import { faDownload, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { downLoadSong } from 'src/api/music.api'

interface Props {
  songInfor: SongInfor | null
}

function ThumnailSong({ songInfor }: Props) {

  const handleDownLoadSong = useCallback(() => {
    if (songInfor?.data) {
      downLoadSong(songInfor?.data?.src_music, songInfor?.data?.name_music)
    }
  }, [songInfor])

  return (
    <div className='flex items-center gap-3'>
      <img className='h-16 w-16 rounded-lg object-cover'
        alt='Song Player'
        src={songInfor?.data?.image_music}
        title={songInfor?.data?.name_music} />
      <div className='text-medium'>
        <h4 className='text-base'>{songInfor?.data.name_music}</h4>
        <span className='text-xs opacity-80 dark:text-gray-300'>{songInfor?.data?.name_singer}</span>
      </div>
      <div className='flex gap-3 ml-3'>
        <BtnControl icon={faHeartRegular} addClass='text-lg' />
        <BtnControl icon={faDownload} addClass='text-lg' title='Download' onClick={handleDownLoadSong} />
      </div>
    </div>
  )
}

export default memo(ThumnailSong)
