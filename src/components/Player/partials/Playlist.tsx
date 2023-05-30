import { useState, useCallback, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faDownload, faHeart } from '@fortawesome/free-solid-svg-icons'
import BtnControl from './BtnControl'
import { downLoadSong } from 'src/api/music.api'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useCheckMatchCurrentSong, usePLayASong } from 'src/hooks'
import { SongInfor } from 'src/types/music.type'
import sound from 'src/assets/sound.svg'

function Playlist() {
  const [switchPlaylist, setSwitchPlaylist] = useState<boolean>(true)
  const [listSong, setListSong] = useState<SongInfor[]>([])

  const { playList, currentSong } = useSelector((state: RootState) => state.player)

  const { handlePLaySong } = usePLayASong()

  const { checkMatchCurrentSong } = useCheckMatchCurrentSong()

  useEffect(() => {
    const playlistHistory = JSON.parse(localStorage.getItem('playlistHistory') || '[]')
    if (!switchPlaylist) {
      setListSong(playlistHistory)
    } else {
      setListSong(playList)
    }
  }, [currentSong, playList, switchPlaylist])

  const hanldeSwitchPlaylist = useCallback(() => {
    setSwitchPlaylist(!switchPlaylist)
  }, [setSwitchPlaylist, switchPlaylist])

  const handleDownLoadSong = useCallback((url: string, songName: string) => {
    downLoadSong(url, songName)
  }, [downLoadSong])

  return (
    <div className='w-[350px] h-[calc(100vh-90px)] fixed right-0 top-0 bottom-0 bg-gray-200 transition-transform  animate-horizontal flex flex-col dark:bg-slate-800'>
      <div className='py-4 px-2'>
        <div className='p-1 rounded-full bg-gray-300 dark:bg-slate-900'>
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

      <div className='px-2 flex-1 overflow-y-auto z-50 scrollbar scrollbar-w-1 scrollbar-track-gray-300 scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full dark:scrollbar-thumb-slate-600 dark:scrollbar-track-slate-700 '>
        <ul className='my-3'>
          {
            listSong?.map((song: SongInfor) => {
              return (
                <li key={song._id} className={`p-2 rounded-md flex items-center group relative mb-2
                ${checkMatchCurrentSong(song._id) ? 'bg-gradient-to-tl to-gradientBlue from-gradientPink text-white' : 'hover:bg-gray-300 dark:hover:bg-gray-600/80'}`}>
                  <div>
                    <div className='w-11 h-11 relative'>
                      {
                        !checkMatchCurrentSong(song._id) &&
                        <button type='button' className='w-full h-full rounded-md absolute top-0 bottom-0 right-0 left-0 text-lg text-white bg-gray-200/40 hidden group-hover:block'
                          onClick={() => { handlePLaySong(song._id, listSong) }}
                        >
                          <FontAwesomeIcon icon={faPlay} />
                        </button>
                      }
                      {
                        checkMatchCurrentSong(song._id) &&
                        <button type='button' className='w-full h-full rounded-md absolute top-0 bottom-0 right-0 left-0 text-lg text-white bg-gray-200/40 flex items-center justify-center'
                        >
                          <img className='w-[70%] h-[70%]' src={sound} alt="icon sound" />
                        </button>
                      }

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
                    <BtnControl icon={faHeart} title='Add to favorites' addClass='hover:text-sky-500' />
                    <BtnControl icon={faDownload} title='Download'
                      onClick={() => { handleDownLoadSong(song.src_music, song.name_music) }}
                    />
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
export default Playlist