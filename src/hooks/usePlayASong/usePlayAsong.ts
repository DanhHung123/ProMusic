import { useDispatch } from 'react-redux'
import { currentSongChange, playListChange, isPlayChange } from 'src/redux/slice/playerSlice'
import { SongInfor } from 'src/types/music.type'

export default function usePLayASong() {
  const dispatch = useDispatch()

  const handlePLaySong = (id: string, playlist: SongInfor[]) => {
    if (playlist) {
      dispatch(playListChange(playlist))

      dispatch(
        currentSongChange(
          playlist.find((song: SongInfor) => {
            return song._id === id
          }) || null
        )
      )
      dispatch(isPlayChange(true))
    }
  }

  return { handlePLaySong }
}
