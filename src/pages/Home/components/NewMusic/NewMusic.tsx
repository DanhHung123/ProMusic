import { useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEye, faPlay } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { getNewMusic } from 'src/api/music.api'
import { SongInfor } from 'src/types/music.type'
import sound from 'src/assets/sound.svg'
import { useCheckMatchCurrentSong, usePLayASong } from 'src/hooks'

const PAGE = 1
const LIMIT = 20

export default function NewMusic() {
  const { currentSong, isPlay } = useSelector((state: RootState) => state.player)

  const { data, isLoading } = useQuery({
    queryKey: ['New Release', LIMIT, PAGE],
    queryFn: () => getNewMusic(LIMIT, PAGE),
    staleTime: Infinity //4 * (60 * 1000)
  })

  const { handlePLaySong } = usePLayASong()

  const { checkMatchCurrentSong } = useCheckMatchCurrentSong()

  const formatNumber = useCallback((number: number): string => {
    const suffixes: string[] = ["", "K", "M", "B", "T"];
    let suffixIndex: number = 0;

    while (number >= 1000 && suffixIndex < suffixes.length - 1) {
      suffixIndex++;
      number /= 1000;
    }

    const formattedNumber: string = number.toFixed(1) + suffixes[suffixIndex];

    return formattedNumber;
  }, [])

  return (
    <section className='w-full overflow-hidden'>
      <h3 className='text-2xl font-semibold'>New release</h3>
      <div className='mt-3 grid grid-cols-4 gap-2'>
        {
          !isLoading ?
            data?.data.data.map((song: SongInfor) => {
              return (
                <div key={song._id} className={`flex items-center justify-between p-2 rounded-md group  
                ${checkMatchCurrentSong(song._id) ? 'bg-cyan-200' : 'hover:bg-cyan-100/80'}`}>
                  <div className='h-12 w-12 relative'>
                    <img className='w-full h-full object-cover rounded-lg' src={song.image_music} alt="new music" />
                    {
                      !checkMatchCurrentSong(song._id) &&
                      <button className='w-full h-full absolute top-0 l-0 r-0 b-0 rounded-lg text-white text-lg bg-gray-300/60 hidden group-hover:block'
                        onClick={() => handlePLaySong(song._id, data.data.data)}
                      ><FontAwesomeIcon icon={faPlay} /></button>
                    }
                    {
                      checkMatchCurrentSong(song._id) &&
                      <button className='w-full h-full absolute top-0 l-0 r-0 b-0 rounded-lg text-white bg-gray-300/60'
                      >
                        <img className='w-[70%] h-[70%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' src={sound} alt="sound icon" />
                      </button>
                    }
                  </div>
                  <div className='flex flex-col text-sm px-1'>
                    <span className='font-medium text-base line-clamp-1'>{song.name_music}</span>
                    <span>{song.name_singer}</span>
                    <p className='text-gray-500'>
                      <span><FontAwesomeIcon icon={faHeart} /> {formatNumber(song.view)} view</span>
                      <span className='ml-2'><FontAwesomeIcon icon={faEye} /> {formatNumber(song.favorite)} favorite</span>
                    </p>
                  </div>
                  <div className='text-sm'>
                    <span className='font-normal'>{song.time_format}</span>
                  </div>
                </div>
              )
            })
            :
            <>
            </>
        }
      </div>
    </section>
  )
}
