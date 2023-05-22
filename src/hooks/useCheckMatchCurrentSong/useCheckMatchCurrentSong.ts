import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

export default function useCheckMatchCurrentSong() {
  const { currentSong, isPlay } = useSelector((state: RootState) => state.player)

  const checkMatchCurrentSong = (id: string) => {
    return currentSong?._id === id && isPlay
  }

  return { checkMatchCurrentSong }
}
