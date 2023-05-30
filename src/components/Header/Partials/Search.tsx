
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { SongInfor } from 'src/types/music.type'
import { usePLayASong } from 'src/hooks'

interface Props {
  data: SongInfor[] | null
  setIsShowSearch: any
}

export default function Search({ data, setIsShowSearch }: Props) {

  const { handlePLaySong } = usePLayASong()

  return (
    <div className='w-full absolute h-[235px] -bottom-60 right-0 left-0 bg-gray-200 rounded-md shadow-xl z-30 overflow-y-auto scrollbar scrollbar-w-1 scrollbar-rounded-full scrollbar-thumb-gray-400 scrollbar-track-gray-300 dark:bg-slate-700 dark:text-white dark:scrollbar-track-slate-500 '>
      <ul className='w-full h-full'>
        {
          data &&
          data?.map((song) => {
            return (
              <li key={song._id} className='px-4 py-2 flex gap-3 cursor-pointer group hover:bg-gray-300 dark:hover:bg-slate-600'
                onClick={() => { handlePLaySong(song._id, data); setIsShowSearch(false) }}
              >
                <div className='relative h-11 w-11'>
                  <img className='w-full h-full rounded-md object-cover' src={song.image_music}
                    alt="search img" />
                  <button className='w-full h-full absolute top-0 right-0 left-0 text-white bg-gray-500/70 hidden group-hover:block
            ' type='button'>
                    <FontAwesomeIcon icon={faPlay} />
                  </button>
                </div>
                <div className=' flex-1 flex items-center justify-between'>
                  <div>
                    <h4 className='line-clamp-1 font-medium'>{song.name_music}</h4>
                    <span className='line-clamp-1 text-sm text-sky-500'>{song.name_singer}</span>
                  </div>
                  <span className='pr-5 text-black/70 dark:text-white/70'>{song.time_format}</span>
                </div>
              </li>
            )
          })
        }
        {
          data && data.length === 0 &&
          <li className='w-full h-full flex items-center justify-center'><span>Couldn't find related song</span></li>
        }
      </ul>
    </div>
  )
}

