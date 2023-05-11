import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faDownload } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegur } from '@fortawesome/free-regular-svg-icons'
import BtnControl from './BtnControl'
import { downLoadSong, getNewMusic } from 'src/api/music.api'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { playListChange, currentSongNameChange, isPlayChange } from 'src/redux/slice/playerSlice'
import { useQuery } from 'react-query'
import { PlayListSkeleton } from 'src/components/Skeleton'

function Playlist() {
  const [switchPlaylist, setSwitchPlaylist] = useState<boolean>(true)

  const { playList } = useSelector((state: RootState) => state.player)
  const dispatch = useDispatch()

  let page = 3
  let limit = 20

  const { data, isLoading } = useQuery({
    queryKey: ['getPlaylist', limit, page],
    queryFn: () => getNewMusic(limit, page),
    staleTime: 4 * (60 * 1000)
  })

  useEffect(() => {
    dispatch(playListChange(data?.data))
  }, [data])

  const hanldeSwitchPlaylist = useCallback(() => {
    setSwitchPlaylist(!switchPlaylist)
  }, [setSwitchPlaylist, switchPlaylist])

  const handleDownLoadSong = useCallback((url: string, songName: string) => {
    downLoadSong(url, songName)
  }, [downLoadSong])

  const handlePlayASong = useCallback((name: string) => {
    dispatch(currentSongNameChange(name))
    dispatch(isPlayChange(true))
  }, [currentSongNameChange, isPlayChange])

  return (
    <div className='w-[350px] h-[calc(100vh-90px)] fixed right-0 top-0 bottom-0 bg-gray-200 transition-transform  animate-horizontal flex flex-col'>
      <div className='py-4 px-2'>
        <div className='p-1 rounded-full bg-gray-300'>
          <button type='button' className={`w-1/2 py-2 text-sm rounded-full text-center transition-all ${!switchPlaylist ? 'text-gray-500 bg-transparent ' : 'text-white bg-gradient-to-tl from-gradientPink to-gradientBlue '}`}
            onClick={hanldeSwitchPlaylist}
          >
            Playlist
          </button>
          <button type='button' className={`w-1/2 py-2 text-sm rounded-full text-center transition-all ${switchPlaylist ? 'text-gray-500 bg-transparent ' : 'text-white bg-gradient-to-tl from-gradientPink to-gradientBlue'}`}
            onClick={hanldeSwitchPlaylist}
          >
            Listened recently
          </button>
        </div>
      </div>

      <div className='px-2 flex-1 overflow-y-auto'>
        <ul className='my-3'>
          {
            !isLoading ?
              playList?.data?.map((song: any) => {
                return (
                  <li key={song._id} className='p-2 rounded-md flex items-center group relative hover:bg-gray-300'>
                    <div>
                      <div className='w-11 h-11 relative'>
                        <button type='button' className='w-full h-full rounded-md absolute top-0 bottom-0 right-0 left-0 text-lg text-white bg-gray-200/40 hidden group-hover:block'
                          onClick={() => { handlePlayASong(song.slug_name_music) }}
                        >
                          <FontAwesomeIcon icon={faPlay} />
                        </button>
                        <img className='w-full h-full rounded-md object-cover' src={song.image_music} alt="playlist" />
                      </div>
                    </div>
                    <div className='ml-2 flex-1'>
                      <h5 className='text-sm line-clamp-1 group-hover:w-[70%]'>{song.name_music}</h5>
                      <span className='text-xs opacity-80 line-clamp-1 group-hover:w-[60%]'>
                        {song.name_singer}
                      </span>
                    </div>
                    <div className='flex items-center absolute top-0 bottom-0 right-0 invisible group-hover:visible'>
                      <BtnControl icon={faHeartRegur} title='Add to favorites' />
                      <BtnControl icon={faDownload} title='Download'
                        onClick={() => { handleDownLoadSong(song.src_music, song.name_music) }}
                      />
                    </div>
                  </li>
                )
              })
              :
              <>
                <PlayListSkeleton />
                <PlayListSkeleton />
                <PlayListSkeleton />
                <PlayListSkeleton />
                <PlayListSkeleton />
                <PlayListSkeleton />
                <PlayListSkeleton />
                <PlayListSkeleton />
                <PlayListSkeleton />
                <PlayListSkeleton />
                <PlayListSkeleton />
              </>
          }
        </ul>
      </div>
    </div>
  )
}
export default Playlist