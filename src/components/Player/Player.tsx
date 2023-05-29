import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { MainPlayerControl, ThumnailSong, VolumeControl } from './partials'
import { SongInfor } from 'src/types/music.type'

let playlistHistory: SongInfor[] = []

export default function Player() {

  const { currentSong } = useSelector((state: RootState) => state.player)

  useEffect(() => {
    playlistHistory = JSON.parse(localStorage.getItem('playlistHistory') || '[]')
    if (playlistHistory.length >= 20) {
      playlistHistory.splice(0, 1)
    }
    if (currentSong) {
      let checkSong = playlistHistory.find((song: SongInfor) => {
        return song._id === currentSong._id
      })
      if (!checkSong) {
        playlistHistory.push(currentSong)
        localStorage.setItem("playlistHistory", JSON.stringify(playlistHistory))
      }
    }
  }, [currentSong, playlistHistory])

  return (
    <>
      {
        currentSong &&
        <div className='h-[90px] z-[100] w-screen fixed bottom-0 right-0 left-0 shadow-2xl shadow-black bg-gray-100 dark:bg-slate-900 dark:shadow-blue-800'>
          <div className='w-full h-full grid grid-cols-3 content-center px-5 dark:text-white'>
            <ThumnailSong songInfor={currentSong} />
            <MainPlayerControl />
            <VolumeControl songInfor={currentSong} />
          </div>
        </div>
      }
    </>
  )
}
